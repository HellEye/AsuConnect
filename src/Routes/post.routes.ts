import { RoutesInput } from "../Types/route"
import { IPost } from "../Models/Post.model"
import { getApi } from "../Routes/RouteFactory"
import crud from "../Controllers/Post.controller"

const routes = (app: RoutesInput) => {
	getApi<IPost>({
		app,
		crud,
		basePath: "/api",
	})
		.genDefault()
		.override("get", "/api/posts", async (req, res) => {
			return crud.controllers.getMany
				.func({})
				.sort({ title: -1 })
				.then((data) => {
					return res.send(data)
				})
				.catch((e: Error) => {
					return res.status(500).send({ success: false })
				})
		})
		.finish()
}

export default routes
