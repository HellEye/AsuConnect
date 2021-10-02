import Card, { ICard } from "../Models/Cards.model"
import getCrud from "./ControllerFactory"

const crud = getCrud<ICard>("/api/cards", Card)
	.get("/:id")
	.get("/", ["name"])
	.update("/:id")
	.add("/")
	.delete("/:id")
	.finish()
export default crud
