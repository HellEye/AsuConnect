import mongoose, { Schema, Document, ObjectId, Date } from "mongoose"

export interface IUserCard extends Document {
	_id: ObjectId
	user: ObjectId
	card: ObjectId
	acquired: Date
}

const UserCardSchema: Schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "Users",
		required: true,
	},
	card: {
		type: Schema.Types.ObjectId,
		ref: "Cards",
		required: true,
	},
	acquired: {
		type: Schema.Types.Date,
		required: true,
	},
})

export default mongoose.model<IUserCard>("UserCards", UserCardSchema)
