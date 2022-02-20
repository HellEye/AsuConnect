import { prop } from "@typegoose/typegoose"
import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class Card {
	@Field(() => String)
	readonly _id!: string

	@Field(() => String)
	@prop({ required: true })
	name: string

	@Field(() => String)
	@prop({ required: true })
	image: string

	@Field(() => String) //TODO: enum?
	@prop({ required: true })
	rarity: string

	@Field(() => Number)
	@prop({ required: true })
	setnum: number

	@Field(() => Boolean)
	@prop({ required: true })
	fullart: boolean

	@Field(() => Boolean)
	@prop({ required: true })
	secret: boolean
}
