import { prop, Ref } from "@typegoose/typegoose"
import { Field, ObjectType } from "type-graphql"
import { Card } from "../cards"
import { User } from "../users"

@ObjectType()
export class UserCard {
	@Field(() => String)
	readonly _id!: string

	@Field(() => String)
	@prop({ ref: () => User, type: () => String, required: true })
	user: Ref<User, string>

	@Field(() => String)
	@prop({ ref: () => Card, type: () => String, required: true })
	card: Ref<Card, string>

	@Field(() => Date)
	@prop({ required: true })
	acquired: Date

	@Field(() => Boolean)
	@prop({ required: true }) 
	holo: boolean
}

//IDEAS:
// - original owner
//
