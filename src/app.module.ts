import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ControllerTestModule } from './controller-test/controller-test.module'
import { UserModule } from './user/user.module'
import { RolesGuard } from './common/roles.guard'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ValidationPipe } from './common/ValidationPipe'
import { AllExceptionFilter } from './common/Allexception.filter'
import { LoggingInterceptor } from './common/interceptor/loggin.interceptor'

@Module({
  imports: [ControllerTestModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
