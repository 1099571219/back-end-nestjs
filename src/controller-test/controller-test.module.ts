import { Module } from '@nestjs/common';
import { ControllerTestController } from './controller-test.controller';
import { ControllerTestService } from './controller-test.service';

@Module({
  controllers: [ControllerTestController],
  providers: [ControllerTestService]
})
export class ControllerTestModule {}
