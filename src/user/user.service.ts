import { BadRequestException, Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { UsersDTO } from './user.controller'
import { UpdateDataDTO } from './user.controller'
import { InjectModel } from '@nestjs/mongoose'
import { formDate } from 'src/utils/NowDate'

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel) {}

  async register(user: UsersDTO) {
    const length = await this.userModel.find().count()
    const userInfo = {
      username: user.username,
      password: user.password,
      id: length,
    }
    try {
      await this.userModel.create(userInfo)
    } catch (error) {
      throw new BadRequestException('用户名已存在')            
    }
    return `用户: ${userInfo} 创建成功！`
  }
  async update(updateData: UpdateDataDTO) {
    updateData.updateData['updateTime'] = formDate()
    console.log(updateData)

    const res = await this.userModel.findOneAndUpdate(
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
    return await this.userModel.find()
  }
  async findUser(username) {
    const res = await this.userModel.findOne({ username })
    return res
  }
}
