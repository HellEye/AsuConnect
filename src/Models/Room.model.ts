import mongoose, { Schema, Document, ObjectId } from "mongoose"

export interface IRoom extends Document {
	_id: ObjectId
	position: {
		x: Number
		y: Number
	}
}

const positionSchema: Schema = new Schema({
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
	position: {
		type: positionSchema,
		required: true,
		_id: false,
	},
})

export default mongoose.model<IRoom>("Room", roomSchema)
