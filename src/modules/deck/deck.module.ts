import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserRepository } from '@modules/user/infra/repositories/typeorm/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeckEntity } from './domain/entities/deck.entity';
import { DeckController } from './infra/http/controllers/deck.controller';
import { DeckRepository } from './infra/repositories/typeorm/deck.repository';
import { CreateDeckService } from './services/create-deck.service';
import { DeleteDeckService } from './services/delete-deck.service';
import { FindAllDeckService } from './services/find-deck.service';
import { UpdateDeckService } from './services/update-deck.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeckEntity, UserEntity])],
  controllers: [DeckController],
  providers: [
    DeckRepository,
    UserRepository,
    CreateDeckService,
    UpdateDeckService,
    FindAllDeckService,
    DeleteDeckService,
  ],
})
export class DeckModule {}
