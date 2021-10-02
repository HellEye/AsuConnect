import mongoose, { Schema, Document, ObjectId, Number } from "mongoose"

export interface IClass extends Document {
	_id: ObjectId
	name: String
	description: String
	bonuses: [
		{
			type: String
			multiplier: Number
		}
	]
}

const ClassSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	bonuses: [
		{
			type: {
				type: String,
				required: true,
			},
			multiplier: {
				type: Number,
				required: true,
			},
		},
	],
})

export default mongoose.model<IClass>("Classes", ClassSchema)
