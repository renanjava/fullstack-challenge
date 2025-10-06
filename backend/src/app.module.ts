import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CollaboratorsModule } from './modules/collaborators/collaborators.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { TimeTrackersModule } from './modules/time-trackers/time-trackers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    CollaboratorsModule,
    ProjectsModule,
    TasksModule,
    TimeTrackersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
