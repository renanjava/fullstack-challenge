import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { mockAuthService } from '../mocks/auth-service.mock';
import { UsersStub } from '../../modules/users/stubs/users.stub';
import { UserRegisterDto } from '../dtos/user-register.dto';

describe('AuthController', () => {
  let controller: AuthController;
  const authService = mockAuthService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register user correctly', async () => {
    const user = new UsersStub();
    authService.register.mockResolvedValue(user);
    const result = await controller.register(user as UserRegisterDto);

    expect(result).toEqual(user);
    expect(authService.register).toHaveBeenCalledWith(user as UserRegisterDto);
  });

  it('should login user correctly', async () => {
    const user = new UsersStub();
    const fakeAccessToken = 'fake-access-token';
    authService.login.mockResolvedValue({ access_token: fakeAccessToken });
    const result = await controller.login(user as UserRegisterDto);

    expect(result).toEqual({ access_token: fakeAccessToken });
    expect(authService.login).toHaveBeenCalledWith(user as UserRegisterDto);
  });
});
