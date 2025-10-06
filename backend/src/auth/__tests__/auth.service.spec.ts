import { Test, TestingModule } from '@nestjs/testing';
import { UserRegisterDto } from '../../auth/dtos/user-register.dto';
import { mockUsersService } from '../../modules/users/mocks/users-service.mock';
import { AuthService } from '../auth.service';
import { UsersService } from '../../modules/users/users.service';
import { UsersStub } from '../../modules/users/stubs/users.stub';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  const usersService = mockUsersService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  /*it('should auth user login correctly with valid data', async () => {
    const user = new UsersStub();
    usersService.findByUsernameAndReturnPassword.mockResolvedValue(user);
    authRepository.create.mockResolvedValue(user);
    const result = await service.create(user as UserRegisterDto);

    expect(result).toEqual(user);
    expect(authRepository.create).toHaveBeenCalledWith(user as UserRegisterDto);
  });*/

  it('should auth create user correctly', async () => {
    const user = new UsersStub();
    usersService.create.mockResolvedValue(user);
    const result = await service.register(user as UserRegisterDto);

    expect(result).toEqual(user);
    expect(usersService.create).toHaveBeenCalledWith(user as UserRegisterDto);
  });
});
