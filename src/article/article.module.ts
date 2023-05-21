import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { articleSchema } from './article.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'article',schema:articleSchema,collection:'articles'}])],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
 