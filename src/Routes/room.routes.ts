import { RoutesInput } from "../Types/route"
import getApi from "./RouteFactory"
import { IPost } from "../Models/Post.model"
import data from "../Controllers/Room.controller"
const routes = (app: RoutesInput) => {
	getApi<IPost>(app, data)
		.override("post", "/", {
			data: (req): any => {
				return {
					position: {
						x: req.body.x,
						y: req.body.y,
					},
				}
			},
		})
		.override("get", "/", {
			extra: [{ dbFunc: "sort", params: { "position.x": "asc" } }],
		})
		.finish()
}

export default routes
