import { Body, Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { createUserDto } from './createUserDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getHello(@Param() params): string {
    console.log(params);
    return this.appService.getHello();
  }
  @Post('addData')
  @HttpCode(204)
  addData(@Body() createUserDto:createUserDto){
    console.log(createUserDto);
    return this.appService.addData()
  }
}
