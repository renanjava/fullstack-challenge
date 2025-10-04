import { UpdateUserDto } from '../dtos/update-user.dto';
import { ResponseUserDto } from '../dtos/response-user.dto';

export abstract class UsersRepository {
  abstract findAll(): Promise<ResponseUserDto[]>;
  abstract findOne(id: string): Promise<ResponseUserDto>;
  abstract update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto>;
}
