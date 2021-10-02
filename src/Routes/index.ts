import { RoutesInput } from "../Types/route"
import user from "./user.routes"
import post from "./post.routes"
import room from "./room.routes"
import card from "./cards.routes"
import userCards from "./userCards.routes"
import classes from "./classes.routes"
import UserClasses from "./userClasses.routes"
import ShopItems from "./shopItems.routes"
export default (app: RoutesInput) => {
	user(app)
	post(app)
	room(app)
	card(app)
	userCards(app)
	classes(app)
	UserClasses(app)
	ShopItems(app)
}
