import { Module } from '@nestjs/common';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserRepository } from '@modules/user/infra/repositories/typeorm/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleAuthController } from './infra/http/controllers/google/google-auth.controller';
import { GoogleAuthService } from './services/google-auth.service';
import { SerializerAuth } from './utils/serializer/serializer-auth';
import { GitHubAuthStrategy } from './utils/strategies/github/github.strategy';
import { GoogleAuthStrategy } from './utils/strategies/google/google.strategy';
import { GitHubAuthController } from './infra/http/controllers/github/github-auth.controller';
import { GitHubAuthService } from './services/github-auth.service';
import { LocalAuthService } from './services/local-auth.service';
import { LocalAuthController } from './infra/http/controllers/local/loca-auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [
    GoogleAuthController,
    GitHubAuthController,
    LocalAuthController,
  ],
  providers: [
    GoogleAuthStrategy,
    GitHubAuthStrategy,
    UserRepository,
    GoogleAuthService,
    GitHubAuthService,
    LocalAuthService,
    SerializerAuth,
  ],
})
export class AuthModule {}
