import { RoutesInput } from "../Types/route"
import { IPost } from "../Models/Post.model"
import getApi from "./RouteFactory"
import data from "../Controllers/Post.controller"

const routes = (app: RoutesInput) => {
	getApi<IPost>(app, data)
		// .override("get", "/", {
		// 	extra: [
		// 		{
		// 			dbFunc: "sort",
		// 			params: (req) => {
		// 				return { title: "asc" }
		// 			},
		// 		},
		// 	],
		// })
		.finish()
}

export default routes
