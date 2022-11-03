import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { UserInterceptor } from './user.interceptor';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (!process.env.PORT) {
    return;
  }

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new UserInterceptor());
  await app.listen(process.env.PORT);
  console.log(`My server is running on port ${process.env.PORT}`);
}

bootstrap();
