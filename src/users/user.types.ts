import { Prisma } from '@prisma/client';

const userWoPassword = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    first_name: true,
    last_name: true,
    full_name: true,
    email: true,
    password: false,
    avatar_url: true,
    created_at: true,
    updated_at: true,
  },
});

export type UserWoPassword = Prisma.UserGetPayload<typeof userWoPassword>;
