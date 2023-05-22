import { articleDocument, articleSchema } from './article.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { userInfo } from 'src/auth/jwt/userJwt.strategy'
import { ArtDataDTO } from './article.controller'
import { Model } from 'mongoose'

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('article') private articleModel: Model<articleDocument>,
  ) {}
  getAll() {
    return this.articleModel.find()
  }
  async create(artData: ArtDataDTO, user: userInfo) {
    console.log(artData,user);
    
    const count = await this.getAll().count()
    console.log(user, artData, count)
    const art = {
      articleId: count,
      authorId: user.userId,
      title:artData.title,
      describe:artData.describe,
      content: artData.content,
    }
    console.log(art);
    
    try {
      
      return await this.articleModel.create(art)
    } catch (error) {
      console.log(error);
    }
  }
  async getByUserId(userId,user){
    console.log(user);
    
    return await this.articleModel.find({userId:userId})
  }
}
