import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IAuthUser {
  sub: string;
  iat: number;
  exp: number;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IAuthUser => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
