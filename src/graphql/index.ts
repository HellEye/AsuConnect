import { Card } from "./cards"
import { GameClass } from "./classes"
import { ConventionProfile } from "./convention_profiles"
import { Convention } from "./conventions"
import { Event } from "./events"
import { ItemSale } from "./item_sales"
import { Item } from "./items"
import { Pack } from "./packs"
import { Post } from "./posts"
import { Quest } from "./quests"
import { Room } from "./rooms"
import { UserCard } from "./user_cards"
import { User } from "./users"
import { getModelForClass, ReturnModelType, buildSchema } from "@typegoose/typegoose"

export {
	Card,
	GameClass,
	ConventionProfile,
	Convention,
	Event,
	ItemSale,
	Item,
	Pack,
	Post,
	Quest,
	Room,
	UserCard,
	User,
}

export const Cards = getModelForClass(Card)
export const GameClasses = getModelForClass(GameClass)
export const ConventionProfiles = getModelForClass(ConventionProfile)
export const Conventions = getModelForClass(Convention)
export const Events = getModelForClass(Event)
export const ItemSales = getModelForClass(ItemSale)
export const Items = getModelForClass(Item)
export const Packs = getModelForClass(Pack)
export const Posts = getModelForClass(Post)
export const Quests = getModelForClass(Quest)
export const Rooms = getModelForClass(Room)
export const UserCards = getModelForClass(UserCard)
export const Users = getModelForClass(User)


const allModels:ReturnModelType<any> = [
	Cards,
	GameClasses,
	ConventionProfiles,
	Conventions,
	Events,
	ItemSales,
	Items,
	Packs,
	Posts,
	Quests,
	Rooms,
	UserCards,
	Users,
]
const allClasses = [
	Card,
	GameClass,
	ConventionProfile,
	Convention,
	Event,
	ItemSale,
	Item,
	Pack,
	Post,
	Quest,
	Room,
	UserCard,
	User,
]

const schemasArray = allClasses.map(c => {
	return {
		name:c.toString().replace("class", "").split(" ")[1],
		schema:buildSchema(c)
	}
})
export const schemas:any = {}
schemasArray.forEach(s => {
	schemas[s.name]=s.schema
})

const resolvers = [] as const

export { resolvers }
