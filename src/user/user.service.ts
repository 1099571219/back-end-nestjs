import {
  BadRequestException,
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  Res,
} from '@nestjs/common'
import * as dayjs from 'dayjs'
import { UsersDTO } from 'src/controller-test/controller-test.service'
import mongoose from 'mongoose'
import { UpdateDataDTO } from './user.controller'
mongoose.connect('mongodb://127.0.0.1:27027/test1')

const { Schema } = mongoose
const userSchema = new Schema({
  username: String,
  password: String,
  createTime: String,
  updateTime: String,
})
const userModel = mongoose.model('User', userSchema)
function formDate() {
  return dayjs(new Date(), 'zh-cn').format('YYYY-MM-DD HH:mm:ss:SSS')
}

@Injectable()
export class UserService {
  async login(userInfo: UsersDTO) {
    const res = await userModel.find({
      username: userInfo.username,
      password: userInfo.password,
    })
    if (!res || res.length===0) return `用户名或密码错误`
    return {msg:`用户: ${userInfo.username} 登录成功`,roles:'admin'}
  }
  async register(user: UsersDTO) {
    const res = await userModel.find({ username: user.username })
    if (res.length !== 0) {
      throw new BadRequestException(`用户: ${user.username} 已存在，请登录！`)
    } else {
      const userInfo = {
        username: user.username,
        password: user.password,
        createTime: formDate(),
      }
      console.log(await userModel.insertMany(userInfo))
      return `用户: ${userInfo} 创建成功！`
    }
  }
  async update(updateData: UpdateDataDTO) {
    updateData.updateData['updateTime'] = formDate()
    console.log(updateData)

    const res = await userModel.findOneAndUpdate(
      { username: updateData.username },
      { $set: updateData.updateData },
    )
    if (!res) {
      throw new BadRequestException(`${updateData} 未找到`)
    }
    return res
  }
  async deleteUser(user: UsersDTO) {
    return user
  }

  async getAll() {
    return await userModel.find({})
  }
  async findUser(username) {
    const res = await userModel.findOne({ username })
    if (!res) {
      throw new BadRequestException(`用户不存在,${res}`)
    }
    return res
  }
}
