import { prop, Ref } from "@typegoose/typegoose"
import { Field, ObjectType } from "type-graphql"
import { Convention } from "../conventions"

@ObjectType()
class Location {
	@Field(() => Number)
	positionX: number

	@Field(() => Number)
	positionY: number
}

@ObjectType()
export class Room {
	@Field(() => String)
	readonly _id!: string

	@Field(() => String)
	@prop({ ref: () => Convention, type: () => String, required: true })
	room: Ref<Convention, string>

	@Field(() => Location)
	@prop({ required: true })
	location: Location

	@Field(() => String)
	@prop({ required: true })
	name: string

	@Field(() => String, { nullable: true })
	@prop()
	description?: string
}
