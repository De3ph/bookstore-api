import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './passport/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport/jwt.strategy';
import { jwtConstants } from './constants';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthService, BcryptService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
