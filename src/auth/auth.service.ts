import { UserService } from 'src/user/user.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validate(username: string, password: string) {
    const user = await this.userService.findUser(username)

    if (user && user.password === password) {
      const { password, ...userInfo } = user

      return userInfo
    } else {
      return null
    }
  }
  async login(user) {
    const { _id, username } = user._doc
    console.log(1)

    const res = { token: this.jwtService.sign({ username, sub: _id }) }
    console.log(2)
    return res
  }
}
