import mongoose from 'mongoose'
import { formDate } from 'src/utils/NowDate'

export const articleSchema = new mongoose.Schema({
  articleId: { type: Number, unique: true, require: true },
  isPublished: { type: Boolean, default: true },
  authorId: { type: Number, require: true },
  content: { type: String, require: true },
  createTime: { type: String, default: formDate() },
  updateTime: { type: String, default: formDate() },
})
articleSchema.index({ articleId: 1 })
