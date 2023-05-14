import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/Allexception.filter';
import { ValidationPipe } from './common/ValidationPipe';
import { RolesGuard } from './common/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3111);
}
bootstrap();
