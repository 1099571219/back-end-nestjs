import { articleDocument, articleSchema } from './article.schema'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { userInfo } from 'src/auth/jwt/userJwt.strategy'
import { ArtDataDTO, contentDTO } from './article.controller'
import { Model } from 'mongoose'
import { formDate } from 'src/utils/NowDate'

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
    if(user.isAdmin)return this.articleModel.updateOne({articleId:content.articleId},{$set:content})
    const res = await this.articleModel.updateOne({articleId:content.articleId,authorId:user.userId},{$set:{...content,updateTime:formDate()}})
    if(res.matchedCount===0)throw new UnauthorizedException('no power to do so')
    return res
  }
  getAll(listId?: number) {
    const res =this.articleModel.find({}, { content: 0 }).sort({articleId:-1})
    
    return res
  }
  getArtsByUserId(userId: number, userInfo: userInfo) {
    return this.articleModel.find({ userId: userId }).sort({articleId:-1})
  }
  getArtById(articleId: number, userInfo: userInfo) {
    return this.articleModel.find({ articleId })
  }
}
