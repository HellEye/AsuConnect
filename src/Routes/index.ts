import { RoutesInput } from "../Types/route"
import user from "./user.routes"
import post from "./post.routes"
export default (app: RoutesInput) => {
	user(app)
	post(app)
}
