import Post, { IPost } from "../Models/Post.model"
import getCrud from "./ControllerFactory"

const crud = getCrud<IPost>("/api/posts", Post)
	.get("/", ["title", "subTitle", "text"])
	.get("/:id")
	.add("/")
	.update("/:id")
	.delete("/:id")
	.finish()

export default crud
