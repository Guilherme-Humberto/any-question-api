import { GoogleAuthService } from '@modules/auth/services/google-auth.service';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Envs } from '@shared/envs/envs';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(GoogleAuthService) private readonly authService: GoogleAuthService,
  ) {
    super({
      clientID: Envs.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: Envs.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: Envs.GOOGLE_AUTH_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const profileData = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
    };
    return await this.authService.validate(profileData);
  }
}
