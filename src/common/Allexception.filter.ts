//异常处理
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'

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
        HttpStatus.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      ]
    }
    response
      .status(status)
      .json({ status,msg, timestamp: new Date().toISOString(), path: request.url })
  }
}
