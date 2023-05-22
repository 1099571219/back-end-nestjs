import { AuthService } from './auth/auth.service';
import { Controller ,Post,  Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local/LocalAuth.guard';
import { Public } from './auth/SkipAuth';

@Controller()
export class AppController {
  constructor(private readonly AuthService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req){
    
      return this.AuthService.login(req.user)
  }
}
