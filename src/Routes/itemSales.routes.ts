import data from "../Controllers/ItemSales.controller"
import { RoutesInput } from "../Types/route"
import { IItemSale } from "../Models/ItemSales.model"
import getApi from "./RouteFactory"

const routes = (app: RoutesInput) => {
	getApi<IItemSale>(app, data).finish()
}

export default routes
