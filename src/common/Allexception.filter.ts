//异常处理
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { formDate } from 'src/utils/NowDate'

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    let msg, status

    if (exception instanceof HttpException) {
      
      msg = exception.getResponse()
      status = exception.getStatus()
    } else { 
      ;[msg, status] = [
        {httpStatus:HttpStatus.INTERNAL_SERVER_ERROR},
        {httpStatus:HttpStatus.INTERNAL_SERVER_ERROR},
      ]
    }
    msg['timestamp'] = formDate()
    msg['path'] = request.url
    response
      .status(status)
      .json(msg)
  }
}
