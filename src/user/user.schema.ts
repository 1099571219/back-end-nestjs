import { userInfo } from './../auth/jwt/userJwt.strategy'
import { Prop } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
import { formDate } from 'src/utils/NowDate'

export interface UserDocument extends Document {
  userId: number
  username: string
  password: string
  role: string
  isAdmin: boolean
  userInfo: UserInfoDoc
  createTime: string
  updateTime: string
}

interface UserInfoDoc {
  name: string
  level: number
}

const UserInfoSchema = new mongoose.Schema({
  name: { type: String, default: '新用户' },
  level: { type: Number, default: 0 },
})

export const UserSchema = new mongoose.Schema({
  userId: { type: Number, unique: true, require: true },
  username: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  role: { type: String, default: 'user' },
  isAdmin: { type: Boolean, default: false },
  userInfo: {
    name: { type: String, default: '新用户' },
    level: { type: Number, default: 0 },
  },
  createTime: { type: String, default: formDate() },
  updateTime: { type: String, default: formDate() },
})

UserSchema.index({ username: 1 })
UserSchema.index({ userId: 1 })

// export class User {
// @Prop()
// userId: { type: Number, unique: true ,require:true}
//   username: { type: String, unique: true ,require:true}
//   password: { type: String ,require:true}
//   role: { type: String, default: 'user' }
//   isAdmin: { type: Boolean, default: false }
//   createTime: { type: String, default: formDate() }
//   updateTime: { type: String, default: formDate() }
// }
