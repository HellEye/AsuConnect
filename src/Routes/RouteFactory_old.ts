import { ControllerOut, Method } from "../Controllers/ControllerFactory_old"
import { RoutesInput } from "../Types/route"
import { Document } from "mongoose"
import { RequestHandler } from "express"

type GetApiInput<D extends Document> = {
	app: RoutesInput
	crud: ControllerOut<D>
	basePath: string
}

type GetApiOut = {
	[key: string]: {
		[key: string]: () => any
	}
}

//TODO refactor this shit cuz it sucks
const getApi = <D extends Document>({
	app,
	crud,
	basePath,
}: GetApiInput<D>) => {
	const out: GetApiOut = {}

	const override = (method: Method, apiPath: string, func: RequestHandler) => {
		if (!out[method]) out[method] = {}
		out[method][basePath + apiPath] = () => {
			app[method](apiPath, func)
		}
		return { override, finish }
	}

	const genDefault = () => {
		for (let key in crud.controllers) {
			const many = key.indexOf("Many") > -1
			const dbKeyIndex = key.indexOf("By")
			const dbKey =
				dbKeyIndex > -1
					? key[dbKeyIndex + 2].toLowerCase() + key.substr(dbKeyIndex + 3)
					: ""

			//I'm sorry for this monster
			//Basically converts all the params to something like
			// "/api/users/:id"
			let apiPath = ""
			if (dbKey === "id" || !dbKey) {
				apiPath = `${basePath}/${crud.model.modelName[0].toLowerCase()}${crud.model.modelName.slice(
					1
				)}${many ? "s" : ""}${dbKey ? "/:" + dbKey : ""}`
			} else {
				apiPath = ``
				// TODO potentially work with query parameters?
			}
			const method = crud.controllers[key].method

			if (!out[method]) out[method] = {}

			out[method][apiPath] = () => {
				try {
					app[method](apiPath, async (req, res) => {
						const findObj: any = {}
						if (dbKey) findObj[dbKey] = req.params[dbKey]
						const data = { ...req.body }
						if (dbKey) delete data[dbKey]

						return crud.controllers[key]
							.func({ findObj, data })
							.then((data) => {
								return res.send(data)
							})
							.catch((e: Error) => {
								res.status(500).send({ success: false })
							})
					})
				} catch (e) {
					throw e
				}
			}
		}
		return { override, finish }
	}

	const finish = () => {
		for (let key in out) {
			for (let key2 in out[key]) {
				out[key][key2]()
			}
		}
	}

	return { genDefault }
}

export { getApi }
