import { prop, Ref } from "@typegoose/typegoose"
import { Field, ObjectType } from "type-graphql"
import { Item } from "../items"
import { User } from "../users"
@ObjectType()
export class ItemSale {
	@Field(() => String)
	readonly _id!: string

	@Field(() => String)
	@prop({ ref: () => User, type: () => String, required: true })
	user: Ref<User, string>

	@Field(() => String)
	@prop({ ref: () => Item, type: () => String, required: true })
	item: Ref<Item, string>

	@Field(() => Date)
	@prop({ required: true })
	date: Date

	@Field(() => Number)
	@prop({ required: true })
	quantity: number

	@Field(() => String) //TODO: enum? also, czy na pewno tego potrzebujemy? trzeba będzie przemyśleć jeszcze raz system sklepu i aktualizacji stocku
	@prop({ required: true })
	type: string
}
