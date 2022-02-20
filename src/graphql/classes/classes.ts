import { prop, Ref } from "@typegoose/typegoose"
import { Field, ObjectType } from "type-graphql"
import { Convention } from "../conventions"

@ObjectType()
export class GameClass {
	@Field(() => String)
	readonly _id!: string

	@Field(() => String)
	@prop({ ref: () => Convention, type: () => String, required: true })
	convention: Ref<Convention, string>

	@Field(() => String)
	@prop({ required: true })
	name: string

	@Field(() => String)
	@prop({ required: true })
	description: string

	//TODO: bonuses
}
