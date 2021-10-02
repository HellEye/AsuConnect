import UserCard, { IUserCard } from "../Models/UserCards.model"
import getCrud from "./ControllerFactory"

const crud = getCrud<IUserCard>("/api/usercards", UserCard)
	.get("/:id")
	.get("/", ["user", "card", "acquired"])
	.update("/:id")
	.add("/")
	.delete("/:id")
	.finish()
export default crud
