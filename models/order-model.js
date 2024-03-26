import { Schema, model } from 'mongoose'

const OrderShema = new Schema({
  title: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  price: { type: Number, required: true },
  seller: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  buyer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  message: { type: String },
  date: { type: Date },
})

export default model('Order', OrderShema)
