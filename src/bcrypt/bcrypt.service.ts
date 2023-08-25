import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private saltRounds = 10;

  async hashPassword(plainPassword: string) {
    const hashedPassword = await bcrypt.hash(plainPassword, this.saltRounds);
    return hashedPassword;
  }

  async comparePasswords(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
