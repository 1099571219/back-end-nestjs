import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { articleSchema } from './article.schema';

@Module({
  imports:[MongooseModule.forFeatureAsync([{name:'article',collection:'articles',useFactory:(...arg)=>{
    const schema = articleSchema
      schema.pre('updateOne',function(){
        console.log(arg);
        console.log('update save');
      })
    return schema 
  }}])],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
  