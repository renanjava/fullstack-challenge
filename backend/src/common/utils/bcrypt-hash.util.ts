import * as bcrypt from 'bcrypt';

export class BcryptHash {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /*static async comparePassword(
    hashPass: string,
    realPass: string,
  ): Promise<boolean> {
    return await bcrypt.compare(realPass, hashPass);
  }*/
}
