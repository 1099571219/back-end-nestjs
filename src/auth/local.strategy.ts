import { AuthService } from './auth.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private AuthService: AuthService) {
    super()
  }
  async validate(username: string, password: string) {
    const user = await this.AuthService.validate(username, password)
    
    if (user) return user
    else throw new UnauthorizedException('incorrect username or password')
  }
}
