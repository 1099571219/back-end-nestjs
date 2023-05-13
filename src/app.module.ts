import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerTestModule } from './controller-test/controller-test.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ControllerTestModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
