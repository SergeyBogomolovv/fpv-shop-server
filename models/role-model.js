import { Schema, model } from 'mongoose'

const RoleShema = new Schema({
  value: { type: String, unique: true },
})

export default model('Role', RoleShema)
