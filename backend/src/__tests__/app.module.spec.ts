import { AppModule } from './../app.module';
import { mockPrismaService } from './../prisma/mocks/prisma-service.mock';
import { PrismaService } from '../prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

describe('AppModule', () => {
  it('should compile AppModule with Prisma and Jwt mocked', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .overrideProvider(ConfigService)
      .useValue({
        get: jest.fn().mockImplementation((key: string) => {
          if (key === 'JWT_SECRET') return 'unsecret-jwt-key';
          return null;
        }),
      })
      .compile();

    expect(moduleRef).toBeDefined();
  });
});
