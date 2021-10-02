import User, { IUser } from "../Models/User.model"
import getCrud from "./ControllerFactory"

const crud = getCrud<IUser>("/api/users", User)
	.get("/:id")
	.get("/", ["email", "name"])
	.update("/:id")
	.add("/")
	.delete("/:id")
	.finish()
export default crud
