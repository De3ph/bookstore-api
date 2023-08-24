import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.find(username);

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
