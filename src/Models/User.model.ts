import mongoose, { Schema, Document, ObjectId } from "mongoose"

export interface IUser extends Document {
	_id: ObjectId
	name: String
	email: String
	class?: ObjectId
	currency: Number
	quests: [
		{
			quest: ObjectId
			status: String
		}
	]
}

const userSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	class: {
		type: Schema.Types.ObjectId,
		ref: "UserClass",
	},
	currency: {
		type: Number,
		required: true,
	},
	quests: [
		{
			quest: {
				type: Schema.Types.ObjectId,
				ref: "Quest",
				required: true,
			},
			status: {
				type: String,
				required: true,
			},
		},
	],
})

export default mongoose.model<IUser>("User", userSchema)
