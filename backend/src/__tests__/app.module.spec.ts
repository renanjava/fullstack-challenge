import { AppModule } from './../app.module';
import { mockPrismaService } from './../prisma/mocks/prisma-service.mock';
import { PrismaService } from '../prisma/prisma.service';
import { Test } from '@nestjs/testing';

describe('AppModule', () => {
  it('should compile AppModule with mocked Prisma', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    expect(moduleRef).toBeDefined();
  });
});
