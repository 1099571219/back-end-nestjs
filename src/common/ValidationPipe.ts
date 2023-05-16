import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log('执行管道验证')
    console.log(value,metatype);
    if(!value) throw new BadRequestException('value null')
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToInstance(metatype, value)
    const error = await validate(object)
    if (error.length > 0) {
      this.errorCatch(error[0])
    }
    return value
  }
  private toValidate(metatype: Function): boolean {
    
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
  private errorCatch(err) {
    if (err.children.length !== 0) {
      this.errorCatch(err.children[0])
    }
    throw new BadRequestException({
      description: 'Validation failed',
      content: Object.values(err.constraints),
    })
  }
}
