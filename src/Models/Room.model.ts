import mongoose, { Schema, Document, ObjectId } from "mongoose"

export interface IRoom extends Document {
	_id: ObjectId
	location: {
		x: Number
		y: Number
	}
}

const locationSchema: Schema = new Schema({
	x: {
		type: Number,
		required: true,
	},
	y: {
		type: Number,
		required: true,
	},
})

const roomSchema: Schema = new Schema({
	location: {
		type: locationSchema,
		required: true,
	},
})

export default mongoose.model<IRoom>("Room", roomSchema)
