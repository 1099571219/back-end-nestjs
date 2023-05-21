import { Public } from 'src/auth/SkipAuth';
import { ArticleService } from './article.service';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { IsString } from 'class-validator';

export class ArtDataDTO{
    @IsString()
    content:string
}

@Controller('article')
export class ArticleController {
    constructor(private ArticleService:ArticleService){}
    @Public()
    @Get('getAll')
    getAlle(){
        return this.ArticleService.getAll()
    }
    @Post('create')
    create(@Request() req,@Body() artData:ArtDataDTO){
        const user = req.user
        return this.ArticleService.create(artData,user)
    }
}
