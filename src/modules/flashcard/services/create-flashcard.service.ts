import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '@modules/user/domain/repositories/user.repository';
import { UserRepository } from '@modules/user/infra/repositories/typeorm/user.repository';
import { FlashcardEntity } from '../domain/entities/flashcard.entity';
import { IFlashcardRepository } from '../domain/repositories/flashcard.repository';
import { CreateFlashcardDto } from '../dto/create-flashcard.dto';
import { FlashcardRepository } from '../infra/repositories/typeorm/flashcard.repository';

@Injectable()
export class CreateFlashcardService {
  constructor(
    @Inject(FlashcardRepository) private readonly flashcard: IFlashcardRepository,
    @Inject(UserRepository) private readonly user: IUserRepository,
  ) {}

  public async execute(data: CreateFlashcardDto): Promise<FlashcardEntity> {
    const user = await this.user.findById(data.deck.id);
    if (!user) throw new NotFoundException('User not found');

    return await this.flashcard.create(data);
  }
}
