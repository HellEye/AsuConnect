import { Application, RequestHandler, Request, Response } from "express"
import { Document, Model, Query } from "mongoose"
import {
	ControllerObject,
	HttpMethods,
	generators,
} from "../Controllers/ControllerFactory"
interface ExtraDbMethods {
	dbFunc: string
	params: any
}
type Method = "get" | "post" | "put" | "delete"
type QueryParams = { [key: string]: string }
interface ApiObject<D extends Document> {
	method: Method
	apiPath: string
	dbFunc: DbFunctions
	extra?: ExtraDbMethods[]
	params: (req: Request) => QueryParams
	data: (req: Request) => any
	then: (res: Response) => (data: any) => any
	catch: (res: Response) => (e: any) => any
}

interface ApiBuilder<D extends Document> {
	override: (
		method: Method,
		path: string,
		obj: Partial<ApiObject<D>>
	) => ApiBuilder<D>
	finish: () => void
}

type DbFunctions =
	| "findOne"
	| "find"
	| "create"
	| "insertMany"
	| "findOneAndUpdate"
	| "updateMany"
	| "deleteOne"
	| "deleteMany"

const getDbFunc = (method: HttpMethods, many: boolean = false): DbFunctions => {
	switch (method) {
		case HttpMethods.get:
			return `find${many ? "" : "One"}`
		case HttpMethods.post:
			return many ? "insertMany" : "create"
		case HttpMethods.put:
			return many ? "updateMany" : "findOneAndUpdate"
		case HttpMethods.delete:
			return `delete${many ? "Many" : "One"}`
	}
}

const getApi = <D extends Document>(
	app: Application,
	data: ControllerObject<D>
): ApiBuilder<D> => {
	const out: { [key: string]: ApiObject<D> } = {}

	data.controllers.forEach((c) => {
		const newApi: ApiObject<D> = {} as ApiObject<D>
		newApi.apiPath = `${data.basePath}${c.path}`
		newApi.method = c.method
		newApi.dbFunc = getDbFunc(c.method, c.many)
		newApi.params = (req: Request) => {
			const findObj: QueryParams = {} as QueryParams
			for (let [key, param] of Object.entries(req.params)) {
				if (key === "id") findObj._id = param
				else findObj[key] = param
			}
			c.allowedQueryParams?.forEach((q: string) => {
				if (q) findObj[q] = req.query[q] as string
			})
			return findObj
		}
		newApi.data = (req: Request) => {
			return req.body
		}
		newApi.then =
			(res) =>
			(data: any): any => {
				return res.send(data)
			}
		newApi.catch =
			(res) =>
			(e: any): any => {
				return res.status(500).send({ error: e })
			}
		out[`${c.method}:${`${c.path}`}`] = newApi
	})

	const override = (
		method: Method,
		path: string,
		obj: Partial<ApiObject<D>>
	): ApiBuilder<D> => {
		out[`${method}:${path}`] = {
			...out[`${method}:${path}`],
			...obj,
		}
		return funcs
	}
	const finish = () => {
		for (let [key, obj] of Object.entries(out)) {
			app[obj.method](obj.apiPath, async (req, res) => {
				const findObj = obj.params(req)
				const newData = obj.data(req)
				let query = generators[obj.dbFunc](data.model, {
					findObj,
					data: newData,
				})
				if (obj.extra) {
					for (let extra of obj.extra) {
						query[extra.dbFunc](extra.params)
					}
				}
				query.then(obj.then(res)).catch(obj.catch(res))
			})
		}
	}
	const funcs: ApiBuilder<D> = {
		override,
		finish,
	}
	return funcs
}

export default getApi
