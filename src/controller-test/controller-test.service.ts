import { Injectable, Res } from '@nestjs/common'
import { IsInt, IsNumber, IsNumberString, IsString } from 'class-validator'
import { MongoClient } from 'mongodb'

export class Users {
  @IsNumberString()
  username: number

  @IsString()
  password: string
}
const model = new MongoClient('mongodb://127.0.0.1:27027')

@Injectable()
export class ControllerTestService {
  getQuery(createUserDto) {
    return { msg: 'return query', data: createUserDto }
  }
  getParams(createUserDto) {
    return { msg: 'return Params', data: createUserDto }
  }
  getUrlEncode(createUserDto) {
    return { msg: 'return urlEncode', data: createUserDto }
  }
  getFormData(createUserDto) {
    return { msg: 'return getFormData', data: createUserDto }
  }
  async addData(createUserDto: Users, res) {
    model.connect()
    const db = model.db('test1')
    const collection = db.collection('users')

    res.send({ msg: 'return addData', data: createUserDto })
  }
}
