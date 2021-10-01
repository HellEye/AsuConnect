import crud from "../Controllers/User.controller"
import { RoutesInput } from "../Types/route"
import { IUser } from "../Models/User.model"
import { getApi } from "../Routes/RouteFactory"

const routes = (app: RoutesInput) => {
	getApi<IUser>({
		app,
		crud,
		basePath: "/api",
	})
		.genDefault()
		.finish()
}
export default routes
