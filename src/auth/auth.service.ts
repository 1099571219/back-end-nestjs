import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private JwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.UserService.findUser(username)
    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }
  async login(userInfo) {
    const user = userInfo._doc
    const payload = {
      username: user.username,
      userId: userInfo.id,
      isAdmin: userInfo.isAdmin,
      sub: user._id,
    }
    return {
      access_token: this.JwtService.sign(payload),
    }
  }
}
