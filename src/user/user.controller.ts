import { UserService } from './user.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common'
import {  IsNumber, IsNumberString, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { Role } from 'src/auth/role/role.enum'
import { Roles } from 'src/auth/role/roles.decorator'
import { RolesGuard } from 'src/auth/role/rolesAuth.guard'
import { Public } from 'src/auth/SkipAuth'

export class UsersDTO{
  @IsString()
  username:string
  @IsString()
  password:string
}

export class updatedData extends UsersDTO{
  @IsOptional()
  password
}
export class UpdateDataDTO extends UsersDTO{
  @IsObject()
  @ValidateNested()
  @Type(()=>updatedData)
  updateData: updatedData
}
export class userDetailInfoDTO {
  @IsOptional()
  @IsString()
  name:string

  @IsOptional()
  @IsNumber()
  level:number
}

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  
  @Public()
  @Post('register')
  register(@Body() userInfo: UsersDTO) {
    return this.UserService.register(userInfo)
  }
  @Put('update')
  update(@Body() updateData: UpdateDataDTO) {
    return this.UserService.update(updateData)
  }
  
  @Roles(Role.Admin)
  @Delete('delete')
  deleteUser(@Body() userInfo: UsersDTO) {
    return this.UserService.deleteUser(userInfo)
  }
  @Public() 
  @Get('getAll')
  getAllUser(@Request() req) {
    return this.UserService.getAll()
  }
  @Get('getUser')
  getUser(@Query('username') username: UsersDTO['username']) {
    return this.UserService.findUser(username)
  }
  @Post('updateUserInfo')
  updateUserInfo(@Body() userInfo:userDetailInfoDTO,@Request() req){
    return this.UserService.updateUserInfo(userInfo,req.user)
  }

}
