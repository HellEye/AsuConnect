import User, { IUser } from "../Models/User.model"
import getCrud2 from "./ControllerFactory"

const crud = getCrud2<IUser>("/api/users", User)
	.get("/:id")
	.get("/", ["email", "name"])
	.update("/:id")
	.add("/")
	.delete("/:id")
	.finish()
export default crud
