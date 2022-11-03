import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from './users/user-entity';

@Injectable()
export class UserInterceptor<T> implements NestInterceptor<T, UserEntity> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UserEntity> {
    return next.handle().pipe(map((data) => new UserEntity(data)));
  }
}
