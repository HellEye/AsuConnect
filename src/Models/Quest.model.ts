import mongoose, { Schema, Document, ObjectId, mongo } from "mongoose"

export interface IQuest extends Document {
	_id: ObjectId
	name: String
	description: String
	category: String
	type: String
	reward?: {
		currency?: Number
		packs?: {
			quantity: Number //TODO pack collection?
			quality?: Number
		}
	}
}

const packsSchema = new Schema({
	quantity: {
		type: Number,
		required: true,
	},
	quality: {
		type: Number,
	},
})
const rewardSchema = new Schema({
	currency: {
		type: Number,
	},
	packs: {
		type: packsSchema,
	},
})
const questSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	reward: {
		type: rewardSchema,
	},
})

export default mongoose.model<IQuest>("Quest", questSchema)
