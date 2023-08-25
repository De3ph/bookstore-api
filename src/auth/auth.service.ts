import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.find(username);
    const isPasswordsMatched = await this.bcryptService.comparePasswords(
      password,
      user.password,
    );

    if (user && isPasswordsMatched) {
      const { username } = user;
      return {
        status: HttpStatus.OK,
        username: username,
      };
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user?.username, sub: user?.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
