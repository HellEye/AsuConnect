import mongoose, { Schema, Document, ObjectId, Number } from "mongoose"

export interface IShopItem extends Document {
	_id: ObjectId
	name: String
	quantity: Number
	description?: String
	price: {
		gameCurrency?: Number
		real?: Number
	}
}

const ShopItemSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
	},
	price: {
		real: {
			type: Number,
		},
		gameCurrency: {
			type: Number,
		},
	},
})

export default mongoose.model<IShopItem>("ShopItems", ShopItemSchema)
