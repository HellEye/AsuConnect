import Quest, { IQuest } from "../Models/Quest.model"
import getCrud from "./ControllerFactory"
const crud = getCrud<IQuest>("/api/quests", Quest)
	.get("/", ["name", "category", "type", "reward"])
	.get("/:id")
	.add("/")
	.delete(":/id")
	.update(":id")
	.finish()

export default crud
