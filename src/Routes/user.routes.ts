import UserController from "../Controllers/User.controller"
import { RoutesInput } from "../Types/route"
import { IUser } from "../Models/User.model"
import { getApi } from "../Routes/RouteFactory"
const controllers = UserController.controllers
/*
	const routes = (app: RoutesInput) => {
		app.post("/api/user", async (req, res) => {
			const user = await controllers.insertOne.func({
				...req.body,
			})
			return res.send({ user })
		})

		app.get("/api/user", async (req, res) => {
			if (req.body.id) {
				const user = await controllers.getOneById.func(req.body.id)
				return res.send({ user })
			} else {
				const users = await controllers.getAll.func()
				return res.send({ users })
			}
		})

		app.put("/api/user", async (req, res) => {
			const dataToUpdate = { ...req.body }
			delete dataToUpdate.id
			const user = await controllers.updateOneById.func(req.body.id, dataToUpdate)
			return res.send({ user })
		})

		app.delete("/api/user", async (req, res) => {
			const user = await controllers.deleteById.func(req.body.id)
			return res.send({ user })
		})

		app.delete("/api/danger/user", async (req, res) => {
			if (!req.body.sure) return res.send({ message: "Need secret confirmation" })
			await controllers.deleteAll.func()
			return res.send({ message: "Users wiped clean off!" })
		})
	}
*/

const routes = (app: RoutesInput) => {
	getApi<IUser>({
		app,
		crud: UserController,
		basePath: "/api",
	})
		.genDefault()
		.finish()
}
export default routes
