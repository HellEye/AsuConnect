import Class, { IClass } from "../Models/Classes.model"
import getCrud from "./ControllerFactory"

const crud = getCrud<IClass>("/api/classes", Class)
	.get("/:id")
	.get("/", ["user", "card", "acquired"])
	.update("/:id")
	.add("/")
	.delete("/:id")
	.finish()
export default crud
