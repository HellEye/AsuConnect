import mongoose, { Schema, Document, ObjectId, Number } from "mongoose"

export interface ICard extends Document {
	_id: ObjectId
	name: string
	rarities: [
		{
			image: string
			value: number
		}
	]
}

const CardSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	rarities: [
		{
			image: {
				type: String,
				required: true,
			},
			value: {
				type: Number,
				required: true,
			},
		},
	],
})

export default mongoose.model<ICard>("Cards", CardSchema)
