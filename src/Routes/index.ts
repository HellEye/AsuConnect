import { RoutesInput } from "../Types/route"
import user from "./user.routes"
export default (app: RoutesInput) => {
	user(app)
}
