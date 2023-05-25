import { jwtConstants } from './jwt/constants';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/userJwt.strategy';
@Module({
  imports:[UserModule,PassportModule,JwtModule.register({
    secret:jwtConstants.user,
    signOptions:{expiresIn:'6000s'}
  })],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
