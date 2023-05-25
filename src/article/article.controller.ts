import { Public } from 'src/auth/SkipAuth'
import { ArticleService } from './article.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
} from '@nestjs/common'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class ArtDataDTO {
  @IsString()
  title: string
  @IsString()
  describe: string
  @IsString()
  content: string
}

export class contentDTO {
  @IsOptional()
  @IsNumber()
  readonly articleId: number
  @IsOptional()
  @IsNumber()
  readonly authorId: number
  @IsOptional()
  @IsString()
  title: string
  @IsOptional()
  @IsString()
  describe: string
  @IsOptional()
  @IsString()
  content: string
  @IsOptional()
  @IsBoolean()
  isPublished: boolean
  @IsOptional()
  @IsString()
  createTime: string
  @IsOptional()
  @IsString()
  updateTime: string
}

@Controller('article')
export class ArticleController {
  constructor(private ArticleService: ArticleService) {}
  @Delete('delete')
  delete(@Query('articleId', ParseIntPipe) articleId: number, @Request() req) {
    return this.ArticleService.delete(articleId, req.user)
  }
  @Post('create')
  create(@Request() req, @Body() artData: ArtDataDTO) {
    const user = req.user
    return this.ArticleService.create(artData, user)
  }
  @Post('update')
  update(@Body() content: contentDTO, @Request() req) {
    return this.ArticleService.update(content, req.user)
  }
  @Public()
  @Get('getAll')
  getAll() {
    console.log(1);
    
    return this.ArticleService.getAll()
  }
  @Public()
  @Get('userId/:userId')
  getArticlesByUserId(@Request() req, @Param('userId') userId: number) {
    return this.ArticleService.getArtsByUserId(userId, req.user)
  }
  @Public()
  @Get('articleId/:articleId')
  getArticleByArticleId(@Request() req, @Param('articleId') articleId: number) {
    return this.ArticleService.getArtById(articleId, req.user)
  }
  @Public()
  @Get('list/:listId')
  getArticlesByList(@Request() req, @Param('listId') listId: number) {
    // return this.ArticleService.
    return 'getArticlesByList'
  }
}
