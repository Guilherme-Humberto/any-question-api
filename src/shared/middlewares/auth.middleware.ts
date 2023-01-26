import { NextFunction, Request, Response } from 'express';
import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Envs } from '@shared/envs/envs';
import * as jwt from 'jsonwebtoken';
import { FindOneUserService } from '@modules/user/services/findOne-user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: FindOneUserService) {}

  validateAuthorization(authorization: string) {
    if (!authorization) throw new UnauthorizedException('JWT token is missing');

    const parts = authorization.split(' ');
    const [scheme, token] = parts;

    if (parts.length !== 2) throw new UnauthorizedException('Token error');
    if (!/^Bearer$/i.test(scheme))
      throw new UnauthorizedException('Token malformatted');

    return token;
  }

  async validateUserAccessToken(token) {
    const userAccess = jwt.decode(token) as any;
    const findUser = await this.userService.execute({
      id: userAccess?.id,
      email: userAccess?.email,
    });

    if (!findUser) throw new NotFoundException('User not found');

    return {
      id: findUser.id,
      email: findUser.email,
    };
  }

  async use(request: Request, _response: Response, next: NextFunction) {
    const authorization = request.headers.authorization;

    const token = this.validateAuthorization(authorization);
    const isValidToken = jwt.verify(token, Envs.SECRET_TOKEN);

    if (!isValidToken) throw new UnauthorizedException('Invalid token');

    const { id, email } = await this.validateUserAccessToken(token);

    request.user = { id, email };

    return next();
  }
}
