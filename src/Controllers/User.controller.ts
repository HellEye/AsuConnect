import User, { IUser } from "../Models/User.model"
import { getCrud } from "./ControllerFactory"

User.findOne()
const crud = getCrud<IUser>(User)
	.many("r")
	.one("c")
	.key("id")
	.one("rud")
	.finish()

export default crud
