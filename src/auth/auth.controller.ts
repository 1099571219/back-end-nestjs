import { AuthService } from './auth.service';
import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
    constructor(private AuthService:AuthService){}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request) {
    return this.AuthService.login(request.user)
  }
}
