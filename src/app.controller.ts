import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import {
  ApiBasicAuth,
  ApiBody,
  ApiHeaders,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInDto } from './auth/dto/signInDto';
import { LoginOKResponseDto } from './auth/dto/LoginOkResponseDto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBasicAuth('login')
  @ApiHeaders([
    {
      name: 'Login',
      description: 'Basic Auth',
    },
  ])
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ type: LoginOKResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedException })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('userInfo')
  @ApiOkResponse()
  getUserInfo(@Request() req) {
    return req.user;
  }
}
