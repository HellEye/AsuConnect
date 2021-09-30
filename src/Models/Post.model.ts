import mongoose, { Schema, Document, ObjectId } from "mongoose"

export interface IPost extends Document {
	_id: ObjectId
	title?: String
	subtitle?: String
	text?: String
}

const postSchema: Schema = new Schema({
	title: {
		type: String,
	},
	subTitle: {
		type: String,
	},
	text: {
		type: String,
	},
})

export default mongoose.model<IPost>("Post", postSchema)
