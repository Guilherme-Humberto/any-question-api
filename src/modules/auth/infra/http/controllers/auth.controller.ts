import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '@modules/auth/utils/guards/google.guard';

@Controller('auth')
export class AuthController {
  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  async GoogleLogin() {
    return { ok: 'Fazendo login' };
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async GoogleLoginRedirect(@Res() response) {
    return response.redirect('/auth/google/status');
  }

  @Get('/google/status')
  user(@Req() request: any) {
    return request.user;
  }
}
