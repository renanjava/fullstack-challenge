import { UserResponseDto } from '../dtos/response-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

export abstract class UsersRepository {
  abstract findAll(): Promise<UserResponseDto[]>;
  abstract findOne(id: string): Promise<UserResponseDto>;
  abstract update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto>;
  abstract softRemove(id: string): Promise<UserResponseDto>;
}
