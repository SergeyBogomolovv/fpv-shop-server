import { Schema, model } from 'mongoose'
const CategorySchema = new Schema({
  value: { type: String, required: true },
})

export default model('Category', CategorySchema)
