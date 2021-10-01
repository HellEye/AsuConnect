import data from "../Controllers/User.controller"
import { RoutesInput } from "../Types/route"
import { IUser } from "../Models/User.model"
import getApi from "./RouteFactory"

const routes = (app: RoutesInput) => {
	getApi<IUser>(app, data).finish()
}
export default routes
