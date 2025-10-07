import { Test, TestingModule } from '@nestjs/testing';
import { UserRegisterDto } from '../../auth/dtos/user-register.dto';
import { mockUsersService } from '../../modules/users/mocks/users-service.mock';
import { AuthService } from '../auth.service';
import { UsersService } from '../../modules/users/users.service';
import { UsersStub } from '../../modules/users/stubs/users.stub';
import { JwtService } from '@nestjs/jwt';
import { BcryptHash } from '../../common/utils/bcrypt-hash.util';
import { mockJwtService } from '../mocks/jwt-service.mock';

describe('AuthService', () => {
  let service: AuthService;
  const usersService = mockUsersService();
  const jwtService = mockJwtService();

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
        { provide: JwtService, useValue: jwtService },
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should auth user login correctly with valid data', async () => {
    const user = new UsersStub();
    const hashedPassword = await BcryptHash.hashPassword(user.password);
    usersService.findByUsernameAndReturnPassword.mockResolvedValue({
      ...user,
      password: hashedPassword,
    });
    jwtService.signAsync.mockResolvedValue('jwt-token-12345');

    const result = await service.login(user as UserRegisterDto);

    expect(result).toEqual({ access_token: 'jwt-token-12345' });
    expect(usersService.findByUsernameAndReturnPassword).toHaveBeenCalledWith(
      user.username,
    );
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: user.id,
      username: user.username,
    });
  });

  it('should auth create user correctly', async () => {
    const user = new UsersStub();
    usersService.create.mockResolvedValue(user);
    const result = await service.register(user as UserRegisterDto);

    expect(result).toEqual(user);
    expect(usersService.create).toHaveBeenCalledWith(user as UserRegisterDto);
  });
});
