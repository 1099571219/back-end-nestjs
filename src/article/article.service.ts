import { articleDocument, articleSchema } from './article.schema'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { userInfo } from 'src/auth/jwt/userJwt.strategy'
import { ArtDataDTO, contentDTO } from './article.controller'
import { Model } from 'mongoose'

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('article') private articleModel: Model<articleDocument>,
  ) {}
  async delete(articleId: number, user: userInfo) {
    const res = await this.articleModel.findOne({
      authorId: user.userId,
      articleId: articleId,
    })
    console.log(res)
    if (res == null) throw new UnauthorizedException('no power to do so')
    return res
  }
  async create(artData: ArtDataDTO, user: userInfo) {
    const count = await this.getAll().count()
    console.log(user, artData, count)
    const art = {
      articleId: count,
      authorId: user.userId,
      title: artData.title,
      describe: artData.describe,
      content: artData.content,
    }
    return await this.articleModel.create(art)
  }
  async update(content:contentDTO,user:userInfo){
    return this.articleModel.updateOne({articleId:content.articleId},{$set:content})
    const res = this.articleModel.updateOne({articleId:content.articleId,authorId:user.userId},{$set:content})
    if(res===null)throw new UnauthorizedException('no power to do so')
    return res
  }
  getAll(listId?: number) {
    return this.articleModel.find({}, { content: 0 }).sort({articleId:-1})
  }
  getArtsByUserId(userId: number, userInfo: userInfo) {
    return this.articleModel.find({ userId: userId }).sort({articleId:-1})
  }
  getArtById(articleId: number, userInfo: userInfo) {
    return this.articleModel.find({ articleId })
  }
}
