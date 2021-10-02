import data from "../Controllers/UserCards.controller"
import { RoutesInput } from "../Types/route"
import { IUserCard } from "../Models/UserCards.model"
import getApi from "./RouteFactory"

const routes = (app: RoutesInput) => {
	getApi<IUserCard>(app, data).finish()
}

export default routes
