import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GitHubAuthGuard } from '@modules/auth/utils/guards/github/github.guard';
import { Envs } from '@shared/envs/envs';

@Controller('auth')
export class GitHubAuthController {
  @Get('/github/login')
  @UseGuards(GitHubAuthGuard)
  async GitHubLoginRedirect(@Req() request, @Res() response) {
    const setCookie = (name: string, content: string) => {
      response.cookie(name, content, { maxAge: Envs.COOKIE_MAXAGE });
    };

    setCookie('user.token', request.user.token);
    setCookie('user.data', JSON.stringify(request.user.data));

    return response.redirect(`http://localhost:3000`);
  }
}
