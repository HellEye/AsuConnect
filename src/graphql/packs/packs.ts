import { prop, Ref } from "@typegoose/typegoose"
import { Field, ObjectType } from "type-graphql"
import { Convention } from "../conventions"
import { User } from "../users"

@ObjectType()
export class Pack {
	@Field(() => String)
	readonly _id!: string

	@Field(() => String)
	@prop({ ref: () => User, type: () => String, required: true })
	user: Ref<User, string>

	@Field(() => String)
	@prop({ ref: () => Convention, type: () => String, required: true })
	convention: Ref<Convention, string>

	@Field(() => String)
	@prop({ required: true })
	rarity: string //TODO: enum?
}
