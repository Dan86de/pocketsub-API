import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/create-user-dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
}
