import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { UserInterceptor } from '../../user.interceptor';

@Controller('auth')
@UseInterceptors(UserInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() user: Prisma.UserCreateInput) {
    //TODO make sure that password & confirm password are equal
    return this.authService.register(user);
  }
}
