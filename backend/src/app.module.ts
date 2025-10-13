import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CollaboratorsModule } from './modules/collaborators/collaborators.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { TimeTrackersModule } from './modules/time-trackers/time-trackers.module';
import { AuthModule } from './auth/auth.module';
import { RabbitmqModule } from './queue/rabbitmq.module';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitmqModule,
    UsersModule,
    CollaboratorsModule,
    ProjectsModule,
    TasksModule,
    TimeTrackersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
  ],
})
export class AppModule {}
