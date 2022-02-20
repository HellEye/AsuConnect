import { prop, Ref } from "@typegoose/typegoose"
import { Field, ObjectType } from "type-graphql"
import { Convention } from "../conventions"

@ObjectType()
export class Post {
	@Field(() => String)
	readonly _id!: string

	@Field(() => String)
	@prop({ ref: () => Convention, type: () => String, required: true })
	room: Ref<Convention, string>

	@Field(() => String)
	@prop({ required: true })
	title: string

	@Field(() => String)
	@prop({ required: true })
	content: string
}
