import { UserSchema } from './user.schema'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { logger } from 'src/common/middleware/logger.middleware'
import { loggerClass } from 'src/common/middleware/loggerClass.middleware'
import { InjectModel, MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: 'user', schema: UserSchema, collection: 'users' }]),
  ], 
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(loggerClass, logger)
      // .exclude({ path: 'user/getAll', method: RequestMethod.GET })
      .forRoutes(UserController)
  }
}
