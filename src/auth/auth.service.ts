import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { Injectable } from '@nestjs/common'
import { UserDocument } from 'src/user/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private JwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string):Promise<Partial<UserDocument>> {
    
    const user = await this.UserService.findUser(username)
      
    if (user.length!==0 && user[0].password === password) {
      const { password, ...result } = user[0]
      return result
    }
    return null 
  }
  async login(userInfo) {
    const user = userInfo._doc as UserDocument
    const payload = {
      userId: user.userId,
      username:user.username,
      isAdmin:user.isAdmin,
      role:user.role,
      sub: user._id,
    }
    
    return {
      access_token: this.JwtService.sign(payload),
    }
  }
}
