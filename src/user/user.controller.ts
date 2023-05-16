import { Users } from 'src/controller-test/controller-test.service'
import { UserService } from './user.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Next,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'
import { ValidationPipe } from 'src/common/ValidationPipe'
import { RolesGuard } from 'src/common/roles.guard'
import { Roles } from 'src/common/roles.decorator'
import { LoggingInterceptor } from 'src/common/interceptor/loggin.interceptor'
import { IsNumberString, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class updatedData extends Users{
  @IsOptional()
  password
}
export class UpdateDataDTO extends updatedData{
  @IsObject()
  @ValidateNested()
  @Type(()=>updatedData)
  updateData: updatedData
}


@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @Post('register')
  register(@Body() userInfo: Users) {
    return this.UserService.register(userInfo)
  }
  @Put('update')
  update(@Body() updateData: UpdateDataDTO) {
    return this.UserService.update(updateData)
  }
  @Delete('deleteUser')
  deleteUser(@Body() userInfo: Users) {
    return this.UserService.deleteUser(userInfo)
  }
  @Get('getAll')
  @Roles('admin')
  getAllUser() {
    return this.UserService.getAll()
  }
  @Get('getUser')
  getUser(@Query('username') username: Users['username']) {
    return this.UserService.getUser(username)
  }
  
}
