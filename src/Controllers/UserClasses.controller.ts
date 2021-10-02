import UserClass, { IUserClass } from "../Models/UserClasses.model"
import getCrud from "./ControllerFactory"

const crud = getCrud<IUserClass>("/api/", UserClass)
	.get("/:id")
	.get("/", [])
	.update("/:id")
	.add("/")
	.delete("/:id")
	.finish()
export default crud
