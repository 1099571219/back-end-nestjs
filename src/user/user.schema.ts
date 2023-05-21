import * as mongoose from 'mongoose'
import { formDate } from 'src/utils/NowDate'

export const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  createTime: { type: String, default: formDate() },
  updateTime: { type: String, default: formDate() },
  id: { type: Number, unique: true },
  isAdmin: { type: Boolean, default: false },
  role:{type:String,default:'user'}
})

UserSchema.index({ username: 1 });
