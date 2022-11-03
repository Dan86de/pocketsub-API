import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(user: Prisma.UserCreateInput) {
    return this.usersService.createUser(user);
  }
}
