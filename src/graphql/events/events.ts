import { prop, Ref } from "@typegoose/typegoose"
import { Field, ObjectType } from "type-graphql"
import { Room } from "../rooms"

@ObjectType()
export class Event {
	@Field(() => String)
	readonly _id!: string

	@Field(() => String)
	@prop({ ref: () => Room, type: () => String, required: true })
	room: Ref<Room, string>

	@Field(() => String)
	@prop({ required: true })
	name: string

	@Field(() => String)
	@prop({ required: true })
	description: string

	@Field(() => Date)
	@prop({ required: true })
	startDate: Date

	@Field(() => Date)
	@prop({ required: true })
	endDate: Date

	@Field(() => Number, { nullable: true })
	@prop()
	capacity?: number
}
