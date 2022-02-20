import { prop, Ref } from "@typegoose/typegoose"
import { WhatIsIt } from "@typegoose/typegoose/lib/internal/constants"
import { Field, ObjectType } from "type-graphql"
import { User } from "../users"

@ObjectType()
class Org {
	@Field(() => String)
	org: string

	@Field(() => String)
	permission: string
}

@ObjectType()
class Map {
	@Field(() => String)
	image: string

	@Field(() => Number)
	sizeX: number

	@Field(() => Number)
	sizeY: number
}

@ObjectType()
export class Convention {
	@Field(() => String)
	readonly _id!: string

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

	@Field(() => String) //TODO: enum?
	@prop({ required: true })
	status: string

	@Field(() => String)
	@prop({ ref: () => User, type: () => String, required: true })
	owner: Ref<User, string>

	@Field(() => [Org])
	@prop({ required: true, default: [], type: () => [Org] }, WhatIsIt.ARRAY)
	orgs: Org[]

	@Field(() => Map)
	@prop({ required: true, type:()=>Map })
	map: Map

	//TODO: SETTINGS!!!
}

//IDEAS:
// - original owner
//
