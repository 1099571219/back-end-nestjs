import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE, Reflector } from '@nestjs/core'
import { ValidationPipe } from './common/ValidationPipe'
import { AllExceptionFilter } from './common/Allexception.filter'
import { LoggingInterceptor } from './common/interceptor/loggin.interceptor'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import { UserSchema } from './user/user.schema'
import { JwtAuthGuard } from './auth/jwt/JwtAuth.guard'
import { RolesGuard } from './auth/role/rolesAuth.guard'
import { CaslModule } from './casl/casl.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [ UserModule,MongooseModule.forRoot('mongodb://127.0.0.1:27027/test1'), AuthModule,MongooseModule.forFeature([{name:'user',schema:UserSchema,collection:'users'}]), CaslModule, ArticleModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide:APP_GUARD,
      useClass:RolesGuard
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
