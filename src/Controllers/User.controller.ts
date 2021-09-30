import { Query, ObjectId } from "mongoose"
import User, { IUser } from "../Models/User.model"
import { Nullable } from "../Types/common"
import { getCrud } from "./ControllerFactory"

const crud = getCrud<IUser>(User)
	.many("r")
	.one("c")
	.key("id")
	.one("rud")
	.finish()

console.log(crud)
export default crud
