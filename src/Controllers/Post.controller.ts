import Post, { IPost } from "../Models/Post.model"
import { getCrud } from "./ControllerFactory"

const crud = getCrud<IPost>(Post)
	.many("r")
	.one("c")
	.key("id")
	.one("rud")
	.finish()

export default crud
