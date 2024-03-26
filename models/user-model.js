import { Schema, model } from 'mongoose'

const UserShema = new Schema({
  email: { type: String, required: true, unique: true },
  addres: { type: String, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  roles: [{ type: String, ref: 'Role', default: 'USER' }],
  orders: [{ type: Schema.Types.Mixed, ref: 'Product' }],
  basket: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  INN: { type: String },
  companyName: { type: String },
  logo: { type: String },
  about: { type: String },
  date: { type: Date },
})

export default model('User', UserShema)
