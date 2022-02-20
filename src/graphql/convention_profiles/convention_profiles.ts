import { prop, Ref } from "@typegoose/typegoose"
import { WhatIsIt } from "@typegoose/typegoose/lib/internal/constants"
import { Field, ObjectType } from "type-graphql"
import { GameClass } from "../classes"
import { Convention } from "../conventions"
import { User } from "../users"

@ObjectType()
class Quest {
	@Field(() => String)
	quest: string //Quest ID

	@Field(() => String)
	status: string //TODO: enum?
}

@ObjectType()
export class ConventionProfile {
	@Field(() => String)
	readonly _id!: string

	@Field(() => String)
	@prop({ ref: () => User, type: () => String, required: true })
	user: Ref<User, string>

	@Field(() => String)
	@prop({ ref: () => Convention, type: () => String, required: true })
	convention: Ref<Convention, string>

	@Field(() => String)
	@prop({ ref: () => GameClass, type: () => String, required: true })
	class: Ref<GameClass, string>

	@Field(() => Number)
	@prop({ required: true })
	exp: number

	@Field(() => Number)
	@prop({ required: true })
	level: number

	@Field(() => Number, { nullable: true })
	@prop()
	currency?: number

	@Field(() => [Quest])
	@prop({ required: true, default: [], type: () => [Quest] }, WhatIsIt.ARRAY)
	quests: Quest[]
}
