import { ControllerOut, Method } from "../Controllers/ControllerFactory"
import { RoutesInput } from "../Types/route"
import { Document } from "mongoose"

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

	const override = (method: Method, apiPath: string, func: any) => {
		out[method][apiPath] = () => {
			app[method](apiPath, func)
		}
		return { override, finish }
	}

	const genDefault = () => {
		for (let key in crud.controllers) {
			const many = key.indexOf("Many") > -1
			const dbKey =
				key.indexOf("By") > -1 ? key.substr(key.indexOf("By") + 2) : ""

			//I'm sorry for this
			//Basically converts all the params to something like
			// "/api/users/:id"
			const apiPath = `${basePath}/${crud.model.modelName[0].toLowerCase()}${crud.model.modelName.slice(
				1
			)}${many ? "s" : ""}/${dbKey ? ":" + dbKey : ""}`
			const method = crud.controllers[key].method
			if (!out[method]) out[method] = {}
			out[method][apiPath] = () => {
				app[method](apiPath, async (req, res) => {
					switch (method) {
						case "delete":
							const delResult = await crud.controllers[key].func()
							return res.send(delResult)
						case "get":
							const getFindObj: any = {}
							getFindObj[key] = req.params[key]
							const getResult = await crud.controllers[key].func(getFindObj)
							return res.send(getResult)
						case "put":
							const putFindObj: any = {}
							putFindObj[key] = req.params[key]
							const dataToUpdate: Partial<D> = { ...req.body }
							const putResult = await crud.controllers[key].func(
								putFindObj,
								dataToUpdate
							)
							return res.send(putResult)
						case "post":
							const postResult = await crud.controllers[key].func(req.body)
							return res.send(postResult)
					}
				})
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
