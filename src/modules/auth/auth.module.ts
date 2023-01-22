import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserRepository } from '@modules/user/infra/repositories/typeorm/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './infra/http/controllers/auth.controller';
import { GoogleAuthService } from './services/google-auth.service';
import { SerializerAuth } from './utils/serializer/serializer-auth';
import { GoogleAuthStrategy } from './utils/strategies/google/google.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [
    GoogleAuthStrategy,
    UserRepository,
    GoogleAuthService,
    SerializerAuth,
  ],
})
export class AuthModule {}
