import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Envs } from '@shared/envs/envs';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements NestMiddleware {
  validateAuthorization(authorization: string) {
    if (!authorization) throw new UnauthorizedException('JWT token is missing');

    const parts = authorization.split(' ');
    const [scheme, token] = parts;

    if (parts.length !== 2) throw new UnauthorizedException('Token error');
    if (!/^Bearer$/i.test(scheme))
      throw new UnauthorizedException('Token malformatted');

    return token;
  }

  async use(request: Request, response: Response, next: NextFunction) {
    const authorization = request.headers.authorization;

    const token = this.validateAuthorization(authorization);
    const isValidToken = verify(token, Envs.SECRET_TOKEN);

    if (!isValidToken) throw new UnauthorizedException('Invalid token');
    return next();
  }
}
