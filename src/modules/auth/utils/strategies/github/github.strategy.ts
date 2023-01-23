import { GitHubAuthService } from '@modules/auth/services/github-auth.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Envs } from '@shared/envs/envs';
import { Profile, Strategy } from 'passport-github';

@Injectable()
export class GitHubAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(GitHubAuthService) private readonly authService: GitHubAuthService,
  ) {
    super({
      clientID: Envs.GITHUB_AUTH_CLIENT_ID,
      clientSecret: Envs.GITHUB_AUTH_CLIENT_SECRET,
      callbackURL: Envs.GITHUB_AUTH_CALLBACK_URL,
      scope: ['user:email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    if (!profile?.emails) {
      throw new BadRequestException('Your email must be public');
    }

    const profileData = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
    };
    return await this.authService.validate(profileData);
  }
}
