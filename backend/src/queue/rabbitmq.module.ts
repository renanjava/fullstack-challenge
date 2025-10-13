import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const url = configService.get<string>('RABBITMQ_URL');
          const queue = configService.get<string>(
            'RABBITMQ_QUEUE_TIME_TRACKER',
          );
          if (!url || !queue) {
            throw new Error(
              `❌ Configuração RabbitMQ ausente! Verifique .env (RABBITMQ_URL e RABBITMQ_QUEUE_TIME_TRACKER)`,
            );
          }
          return {
            transport: Transport.RMQ,
            options: {
              urls: [url],
              queue,
              queueOptions: { durable: true },
              socketOptions: {
                heartbeatIntervalInSeconds: 60,
                reconnectTimeInSeconds: 5,
              },
            },
          };
        },

        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitmqModule {}
