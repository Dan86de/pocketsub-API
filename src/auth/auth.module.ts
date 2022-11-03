import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService, PrismaService],
  exports: [AuthService, UsersService],
})
export class AuthModule {}
