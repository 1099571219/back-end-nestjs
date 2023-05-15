import {
  BadRequestException,
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  Res,
} from '@nestjs/common'
import { Users } from 'src/controller-test/controller-test.service'
import mongoose from 'mongoose'
import { UpdateData } from './user.controller'
mongoose.connect('mongodb://127.0.0.1:27027/test1')

const { Schema } = mongoose
const userSchema = new Schema({
  username: String,
  password: String,
})
const userModel = mongoose.model('User', userSchema)

@Injectable()
export class UserService {
  async register(user: Users) {
    const res = await userModel.find({ username: user.username })
    if (res.length !== 0) {
      throw new HttpException(
        `用户: ${user.username} 已存在，请登录！`,
        HttpStatus.FORBIDDEN,
      )
    } else {
      console.log(await userModel.insertMany(user))
      return `用户: ${user.username} 创建成功！`
    }
  }
  async update(updateData: UpdateData) {
    const res = await userModel.findOneAndUpdate(
      { username: updateData.username },
      { $set: updateData.updateData })
      if(!res){
        throw new BadRequestException(`${updateData} 未找到`)
      }
    return res
  }
  async deleteUser(user: Users) {
    return user
  }

  async getAll() {
    return await userModel.find({})
  }
}
