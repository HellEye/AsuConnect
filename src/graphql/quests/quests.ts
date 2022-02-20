import { prop } from "@typegoose/typegoose"
import { Field, ObjectType } from "type-graphql"

@ObjectType()
class PackData {
	@Field(() => Number)
	rarity: number

	@Field(() => Number)
	quantity: number
}

@ObjectType()
class Reward {
	@Field(() => Number)
	xp: number

	@Field(() => Number)
	currency: number

	@Field(() => PackData)
	pack: PackData
}

@ObjectType()
export class Quest {
	@Field(() => String)
	readonly _id!: string

	@Field(() => String)
	@prop({ required: true })
	name: string

	@Field(() => String)
	@prop({ required: true })
	description: string

	@Field(() => String) //TODO: enum?
	@prop({ required: true })
	category: string

	@Field(() => String) //TODO: enum?
	@prop({ required: true })
	type: string

	@Field(() => Reward)
	@prop({ required: true })
	reward: Reward
}
