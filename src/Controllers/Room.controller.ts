import Room, { IRoom } from "../Models/Room.model"
import getCrud from "./ControllerFactory"

const crud = getCrud<IRoom>("/api/rooms", Room)
	.get("/", ["x", "y"])
	.get("/:id")
	.add("/")
	.update("/:id")
	.delete(":/id")
	.finish()

export default crud
