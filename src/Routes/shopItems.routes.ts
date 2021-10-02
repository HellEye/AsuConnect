import data from "../Controllers/ShopItems.controller"
import { RoutesInput } from "../Types/route"
import { IShopItem } from "../Models/ShopItems.model"
import getApi from "./RouteFactory"

const routes = (app: RoutesInput) => {
	getApi<IShopItem>(app, data).finish()
}

export default routes
