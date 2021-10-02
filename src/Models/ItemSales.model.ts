import mongoose, { Schema, Document, ObjectId, Number, Date } from "mongoose"

export interface IItemSale extends Document {
	_id: ObjectId
	transaction: [
		{
			item: ObjectId
			quantity: Number
			type: String
		}
	]
	time: Date
	user?: ObjectId
}

const ItemSaleSchema: Schema = new Schema({
	transaction: [
		{
			item: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: "ShopItems",
			},
			quantity: {
				type: Schema.Types.Number,
				required: true,
			},
			type: {
				type: String,
				required: true,
			},
		},
	],
	time: {
		type: Schema.Types.Date,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "Users",
	},
})

export default mongoose.model<IItemSale>("ItemSales", ItemSaleSchema)
