import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UsersService } from 'src/users/users.service';
import { LoginOKResponseDto } from './dto/LoginOkResponseDto';

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

  async login(user: any): Promise<LoginOKResponseDto> {
    const res = new LoginOKResponseDto();
    const payload = { username: user?.username, sub: user?.userId };
    res.access_token = this.jwtService.sign(payload);
    return res;
  }
}
