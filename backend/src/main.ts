import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin123@rabbitmq:5672'],
      queue: process.env.RABBITMQ_QUEUE_TIME_TRACKER,
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Fullstack Challenge')
    .setDescription('Time Tracker API documentation')
    .setVersion('1.0')
    .addTag('time-tracker')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Insira o token JWT aqui',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const rabbitUrl = configService.get<string>('RABBITMQ_URL');
  const rabbitQueue = configService.get<string>('RABBITMQ_QUEUE_TIME_TRACKER');

  if (!rabbitUrl || !rabbitQueue) {
    throw new Error(
      `❌ Configuração RabbitMQ ausente! Verifique .env (RABBITMQ_URL e RABBITMQ_QUEUE_TIME_TRACKER)`,
    );
  }

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`🚀 HTTP Server rodando na porta ${process.env.PORT ?? 3000}`);
}
void bootstrap();
