import data from "../Controllers/Cards.controller"
import { RoutesInput } from "../Types/route"
import { ICard } from "../Models/Cards.model"
import getApi from "./RouteFactory"

const routes = (app: RoutesInput) => {
	getApi<ICard>(app, data).finish()
}

export default routes
