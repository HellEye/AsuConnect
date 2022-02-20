import { prop } from "@typegoose/typegoose"
import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class Item {
	@Field(() => String)
	readonly _id!: string

	@Field(() => String)
	@prop({ required: true })
	name: string

	@Field(() => String)
	@prop({ required: true })
	description: string

	@Field(() => String)
	@prop({ required: true })
	image: string

	@Field(() => Number, { nullable: true })
	@prop()
	quantity?: number

	@Field(() => Number)
	@prop({ required: true })
	conPrice: number

	@Field(() => Number)
	@prop({ required: true })
	irlPrice: number
}

// NOTE:
// Zrobiłem dwa pola ceny zamiast obiektu bo w sumie nie wiem po co on, nie pamiętam
//
