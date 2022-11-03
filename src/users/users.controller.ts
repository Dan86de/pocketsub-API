import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { UserEntity } from './user-entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const userFromDb = await this.userService.getUser(id);
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

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ) {
    const updatedUserData = await this.userService.updateUser(id, data);
    return new UserEntity({
      ...updatedUserData,
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
