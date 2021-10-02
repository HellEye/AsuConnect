import mongoose, { Schema, Document, ObjectId, Number } from "mongoose"

export interface IUserClass extends Document {
	_id: ObjectId
	user: ObjectId
	class: ObjectId
	xp: Number
}

const UserClassSchema: Schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "Users",
		required: true,
	},
	class: {
		type: Schema.Types.ObjectId,
		ref: "Classes",
		required: true,
	},
	xp: {
		type: Schema.Types.Number,
		required: true,
	},
})

export default mongoose.model<IUserClass>("UserClasses", UserClassSchema)
