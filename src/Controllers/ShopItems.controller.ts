import ShopItem, { IShopItem } from "../Models/ShopItems.model"
import getCrud from "./ControllerFactory"

const crud = getCrud<IShopItem>("/api/shopItems", ShopItem)
	.get("/:id")
	.get("/", ["name", "price", "realPrice", "gamePrice"])
	.update("/:id")
	.add("/")
	.delete("/:id")
	.finish()
export default crud
