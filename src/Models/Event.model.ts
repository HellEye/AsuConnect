import mongoose, { Schema, Document, ObjectId } from "mongoose"

export interface IEvent extends Document {
	_id: ObjectId
	room: ObjectId
	name: String
	description?: String
	time: Date
	capacity?: Number
}

const eventSchema = new Schema({
	room: {
		type: Schema.Types.ObjectId,
		ref: "Room",
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	time: {
		type: Schema.Types.Date,
		required: true,
	},
	capacity: {
		type: Number,
	},
})

export default mongoose.model<IEvent>("Event", eventSchema)
