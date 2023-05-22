import { Public } from 'src/auth/SkipAuth';
import { ArticleService } from './article.service';
import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';

export class ArtDataDTO{
    @IsString()
    title:string
    @IsString()
    describe:string
    @IsString()
    content:string
}

@Controller('article')
export class ArticleController {
    constructor(private ArticleService:ArticleService){}
    @Public()
    @Get('getAll')
    getAll(){
        return this.ArticleService.getAll()
    }
    @Post('create')
    create(@Request() req,@Body() artData:ArtDataDTO){
        console.log(req.user,artData);
        
        const user = req.user
        return this.ArticleService.create(artData,user)
    }
    @Get('userId/:userId')
    getByUserId(@Request() req,@Param('userId') userId:number){
        return this.ArticleService.getByUserId(userId,req.user)
    }
    
}
