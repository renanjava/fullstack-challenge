import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaProjectsRepository } from './repositories/prisma-projects.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaProjectsRepository],
})
export class ProjectsModule {}
