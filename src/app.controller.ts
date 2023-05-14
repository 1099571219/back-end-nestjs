import { Body, Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { createUserDto } from './createUserDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Param() params): string {
    return this.appService.getHello();
  }
  
}
