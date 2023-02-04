import { Request, Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Envs } from '@shared/envs/envs';
import { SessionUserDto } from '@modules/user/dto/session-user.dto';
import { LocalAuthService } from '@modules/auth/services/local-auth.service';

@Controller('auth')
export class LocalAuthController {
  constructor(private readonly localAuthService: LocalAuthService) {}

  @Post('/logout')
  async LocalLoginAuth(@Req() request: Request, @Res() response: Response) {
    request.session.destroy((err) => {
      if (err) throw new BadRequestException('Error in logout');
      request.user = {};
      response.clearCookie('user.data');
      response.clearCookie('user.token');
      return response.json({ status: 'logout' });
    });
  }

  @Post('/local/login')
  async login(
    @Body() data: SessionUserDto,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.localAuthService.execute(data);
    const setCookie = (name: string, content: string) => {
      response.cookie(name, content, {
        maxAge: Envs.COOKIE_MAXAGE,
        secure: true,
      });
    };

    setCookie('user.token', result.token);
    setCookie('user.data', JSON.stringify(result.user));

    return response.json(result);
  }
}
