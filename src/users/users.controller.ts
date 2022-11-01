import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { UserEntity } from './user-entity';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const userFromDb = await this.userService.getUserById(id);
    return new UserEntity({
      ...userFromDb,
    });
  }

  @Post()
  async createUser(@Body() createUserDto: Prisma.UserCreateInput) {
    const createdUserData = await this.userService.createUser(createUserDto);
    return new UserEntity({
      ...createdUserData,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUser({ id });
    return new UserEntity({
      ...deletedUser,
    });
  }
}

//TODO working on users endpoints and make auth flow for app
