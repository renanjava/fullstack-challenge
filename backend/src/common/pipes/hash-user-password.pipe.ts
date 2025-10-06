/* eslint-disable @typescript-eslint/no-unused-vars */
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { UserRegisterDto } from '../../auth/dtos/user-register.dto';
import { BcryptHash } from '../utils/bcrypt-hash.util';

@Injectable()
export class HashUserPasswordPipe implements PipeTransform {
  async transform(value: UserRegisterDto, metadata: ArgumentMetadata) {
    const { password, ...dto } = value;
    const hashPassword = await BcryptHash.hashPassword(password);
    return { ...dto, password: hashPassword };
  }
}
