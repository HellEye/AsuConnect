import data from "../Controllers/Quest.controller"
import { RoutesInput } from "../Types/route"
import { IQuest } from "../Models/Quest.model"
import getApi from "./RouteFactory"

const routes = (app: RoutesInput) => {
	getApi<IQuest>(app, data).finish()
}

export default routes
