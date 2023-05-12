import { Injectable } from '@nestjs/common'
import { MongoClient, MongoClientOptions } from 'mongodb'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
  async addData() {
    // const mongo = await MongoClient.connect('mongodb://127.0.0.1:27027/ipying')
  }
}
