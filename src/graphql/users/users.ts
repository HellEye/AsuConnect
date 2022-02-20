import { prop } from "@typegoose/typegoose"
import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class User {
	@Field(() => String)
	readonly _id!: string

	@Field(() => String)
	@prop({ required: true })
	name: string

	@Field(() => Boolean, { nullable: true })
	@prop()
	org?: boolean

	@Field(() => Number)
	@prop({ required: true })
	globalLevel: number

	@Field(() => Number, { nullable: true })
	@prop()
	globalCurrency?: number

}
