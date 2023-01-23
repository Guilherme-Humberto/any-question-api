import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '@modules/user/domain/repositories/user.repository';
import { UserRepository } from '@modules/user/infra/repositories/typeorm/user.repository';
import { DeckEntity } from '../domain/entities/deck.entity';
import { IDeckRepository } from '../domain/repositories/deck.repository';
import { CreateDeckDto } from '../dto/create-deck.dto';
import { DeckRepository } from '../infra/repositories/typeorm/deck.repository';

@Injectable()
export class CreateDeckService {
  constructor(
    @Inject(DeckRepository) private readonly deck: IDeckRepository,
    @Inject(UserRepository) private readonly user: IUserRepository,
  ) {}

  public async execute(data: CreateDeckDto): Promise<DeckEntity> {
    const deck = await this.deck.findOne({ title: data.title });
    const user = await this.user.findOne({ id: data.user });

    if (!user) throw new NotFoundException('User not found');
    if (deck) throw new BadRequestException('Deck already exists');

    return await this.deck.create(data);
  }
}
