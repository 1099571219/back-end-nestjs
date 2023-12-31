import { userInfo } from './../auth/jwt/userJwt.strategy';
import { BadRequestException, Injectable } from '@nestjs/common'
import dayjs from 'dayjs'
import { UsersDTO, userDetailInfoDTO } from './user.controller'
import { UpdateDataDTO } from './user.controller'
import { InjectModel } from '@nestjs/mongoose'
import { formDate } from 'src/utils/NowDate'
import { Model } from 'mongoose'
import { UserDocument } from './user.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel:Model<UserDocument>) {}

  async register(user: UsersDTO) {
    const length = await this.userModel.find().count()
    
    const userInfo = {
      username: user.username,
      password: user.password,
      userId: length,
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
  async findUser(username:UsersDTO['username']) {
      const res = await this.userModel.find({ username })
      if(res){
        return res
      }else{
        return null
      }
  }
  async updateUserInfo(userInfo:userDetailInfoDTO,user:userInfo){
    return await this.userModel.updateOne({userId:user.userId},{$set:{userInfo}})
  }
}
