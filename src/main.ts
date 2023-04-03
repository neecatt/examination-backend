import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, Access-Control-Allow-Origin',
    credentials: true,
    preflightContinue: false,
  });

  const config = new DocumentBuilder()
    .setTitle('Demo Application')
    .setDescription('Demo API Application')
    .setVersion('v1')
    .addTag('question')
    .addTag('subject')
    .addTag('teacher')
    .addTag('student')
    .addTag('unigroup')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
