import { Users } from 'src/controller-test/controller-test.service'
import { UserService } from './user.service'
import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Put, Res } from '@nestjs/common'
export interface UpdateData {
    username:Users['username'],
    updateData:Partial<Users>
}


@Controller('user')
export class UserController {
  constructor(private UserService:UserService) {}
  @Post('register')
  register(@Body() userInfo:Users){
    return this.UserService.register(userInfo)
  }
  @Put('update')
  update(@Body() updateData:UpdateData){
    return this.UserService.update(updateData)
  }
  @Delete('deleteUser')
  deleteUser(@Body() userInfo: Users) {
    return this.UserService.deleteUser(userInfo)
   }
}
