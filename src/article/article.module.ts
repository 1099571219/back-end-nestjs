import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { articleSchema } from './article.schema';

@Module({
  imports:[MongooseModule.forFeatureAsync([{name:'article',collection:'articles',useFactory:()=>{
    const schema = articleSchema
      schema.pre('save',function(){
        console.log('pre save');
      })
    return schema 
  }}])],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
  