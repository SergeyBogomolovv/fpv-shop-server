import { Schema, model } from 'mongoose'

const ProductShema = new Schema({
  price: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  images: [{ type: String }],
  sellerId: { type: Schema.Types.ObjectId, required: true },
  categories: [{ type: String, ref: 'Category' }],
})

export default model('Product', ProductShema)
