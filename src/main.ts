import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // this helps to log the request and response details
  app.useLogger(app.get(Logger));

  // for the class-validator and class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true, // This enables class-transformer
      transformOptions: {
        enableImplicitConversion: true, // This allows class-transformer to convert types implicitly
      },
    }),
  );

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true,
  });
  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
