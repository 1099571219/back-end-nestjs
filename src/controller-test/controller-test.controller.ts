import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { ControllerTestService, UsersDTO } from './controller-test.service'
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import { CreateFormData } from './formDataDto'



@Controller('controller')
export class ControllerTestController {
  constructor(private ControllerTestService: ControllerTestService) {}
  @Get('getQuery')
  getQuery(@Query() createUserDto) {
    console.log(createUserDto)
    return this.ControllerTestService.getQuery(createUserDto)
  }
  @Get('getParams:id&:db')
  getParams(@Param() createUserDto) {
    console.log(createUserDto)
    return this.ControllerTestService.getParams(createUserDto)
  }
  @Post('getUrlEncode')
  getUrlEncode(@Body() createUserDto) {
    console.log('urlCode:',createUserDto)
    return this.ControllerTestService.getUrlEncode(createUserDto)
  }

  
  @Post('getFormData')
  @UseInterceptors(AnyFilesInterceptor())
  getFormData(@Body() createFormData: CreateFormData, @UploadedFiles() files) {
    
    console.log('data', createFormData)
    console.log('fils', files)
    return this.ControllerTestService.getFormData(createFormData)
  }
  @Post('addData')
  addData(@Body() createUserDto:UsersDTO, @Res() res) {
    this.ControllerTestService.addData(createUserDto, res)
  }
  


}
 