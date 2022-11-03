import { Prisma } from '@prisma/client';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsNotEmpty()
  @MinLength(3)
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
