import ItemSale, { IItemSale } from "../Models/ItemSales.model"
import getCrud from "./ControllerFactory"

const crud = getCrud<IItemSale>("/api/itemSales", ItemSale)
	.get("/:id")
	.get("/", ["sort", "transaction", "user", "time"])
	.update("/:id")
	.add("/")
	.delete("/:id")
	.finish()
export default crud
