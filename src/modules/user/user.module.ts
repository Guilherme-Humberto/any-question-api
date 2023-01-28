import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';
import { UserController } from './infra/http/controllers/user.controller';
import { UserRepository } from './infra/repositories/typeorm/user.repository';
import { CreateUserService } from './services/create-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { FindAllUserService } from './services/find-user.service';
import { FindOneUserService } from './services/findOne-user.service';
import { UpdateUserService } from './services/update-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserService,
    UpdateUserService,
    FindAllUserService,
    FindOneUserService,
    DeleteUserService,
  ],
  exports: [FindOneUserService],
})
export class UserModule {}
