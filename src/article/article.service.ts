import { articleSchema } from './article.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { userInfo } from 'src/auth/jwt/userJwt.strategy'
import { ArtDataDTO } from './article.controller'
import { Model } from 'mongoose'

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('article') private articleModel: Model<typeof articleSchema>,
  ) {}
  getAll() {
    return this.articleModel.find()
  }
  async create(artData: ArtDataDTO, user: userInfo) {
    const count = await this.getAll().count()
    console.log(user, artData, count)
    const art = {
      articleId: count,
      authorId: user.userId,
      content: artData.content,
    }
    return await this.articleModel.create(art)
  }
}
