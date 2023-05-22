import mongoose, { Document } from 'mongoose'
import { formDate } from 'src/utils/NowDate'

export interface articleDocument extends Document {
  articleId: number
  authorId: number
  title: string
  describe: string
  content: string
  isPublished: boolean
  createTime: string
  updateTime: string
}

export const articleSchema = new mongoose.Schema({
  articleId: { type: Number, unique: true, require: true },
  authorId: { type: Number, require: true },
  title: { type: String, require: true },
  describe: { type: String, default: '暂无描述' },
  content: { type: String, require: true },
  isPublished: { type: Boolean, default: true },
  createTime: { type: String, default: formDate() },
  updateTime: { type: String, default: formDate() },
})
articleSchema.index({ articleId: 1 })
articleSchema.index({ authorId: 1 })
articleSchema.index({ title: 1 })
articleSchema.index({ describe: 1 })
