import data from "../Controllers/UserClasses.controller"
import { RoutesInput } from "../Types/route"
import { IUserClass } from "../Models/UserClasses.model"
import getApi from "./RouteFactory"

const routes = (app: RoutesInput) => {
	getApi<IUserClass>(app, data).finish()
}

export default routes
