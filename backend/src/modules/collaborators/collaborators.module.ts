import { Module } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaCollaboratorsRepository } from './repositories/prisma-collaborators.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService, PrismaCollaboratorsRepository],
})
export class CollaboratorsModule {}
