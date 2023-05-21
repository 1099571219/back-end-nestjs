import { Injectable } from '@nestjs/common'
import { MongoClient, MongoClientOptions } from 'mongodb'
import { UsersDTO } from './user/user.controller'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class AppService {
  constructor(@InjectModel('user') private userModel){}
  getHello(): string {
    return 'Hello World!'
  }
  async addData() {
    // const mongo = await MongoClient.connect('mongodb://127.0.0.1:27027/ipying')
  }
  async login(userInfo: UsersDTO) {

    const res = await this.userModel.find({
      username: userInfo.username,
      password: userInfo.password,
    })
    if (!res || res.length===0) return `用户名或密码错误`
    return {msg:`用户: ${userInfo.username} 登录成功`,roles:'admin'}
  }
}
