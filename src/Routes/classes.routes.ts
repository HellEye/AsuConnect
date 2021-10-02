import data from "../Controllers/Classes.controller"
import { RoutesInput } from "../Types/route"
import { IClass } from "../Models/Classes.model"
import getApi from "./RouteFactory"

const routes = (app: RoutesInput) => {
	getApi<IClass>(app, data).finish()
}

export default routes
