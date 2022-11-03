import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInterceptor } from '../../user.interceptor';
import { CreateUserDto } from '../users/create-user-dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Controller('auth')
@UseInterceptors(UserInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('register')
  async register(@Body() user: CreateUserDto, @Res() res: any): Promise<User> {
    const newUser = await this.authService.register(user);
    const token = this.jwtService.sign({ user_id: newUser.id });

    return res
      .cookie('access_token', token, {
        httpOnly: true,
        domain: process.env.DOMAIN,
        expires: new Date(
          // Date.now() + process.env.JWT_EXPIRATION_SECRET * 1000,
          Date.now() + 60 * 1000,
        ),
      })
      .json(user);
  }
}
