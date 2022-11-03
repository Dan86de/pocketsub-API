import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: User['id']) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { subscriptions: true },
    });
  }

  async createUser(data: Prisma.UserCreateInput) {
    const userData = { ...data };
    userData.password = this.hashPassword(userData.password);
    userData.email = userData.email.trim().toLowerCase();
    return this.prisma.user.create({
      data: userData,
    });
  }

  async updateUser(id: string, userData: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      data: userData,
      where: { id },
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    });
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  }
}
