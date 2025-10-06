import { PartialType } from '@nestjs/mapped-types';
import { UserRegisterDto } from '../../../auth/dtos/user-register.dto';

export class UpdateUserDto extends PartialType(UserRegisterDto) {}
