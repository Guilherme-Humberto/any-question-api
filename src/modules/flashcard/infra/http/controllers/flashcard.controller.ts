import { FlashcardEntity } from '@modules/flashcard/domain/entities/flashcard.entity';
import { CreateFlashcardDto } from '@modules/flashcard/dto/create-flashcard.dto';
import { UpdateFlashcardDto } from '@modules/flashcard/dto/update-flashcard.dto';
import { CreateFlashcardService } from '@modules/flashcard/services/create-flashcard.service';
import { DeleteFlashcardService } from '@modules/flashcard/services/delete-flashcard.service';
import { FindAllFlashcardService } from '@modules/flashcard/services/findAll-flashcard.service';
import { UpdateFlashcardService } from '@modules/flashcard/services/update-flashcard.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('flashcard')
export class FlashcardController {
  constructor(
    private readonly createService: CreateFlashcardService,
    private readonly updateService: UpdateFlashcardService,
    private readonly findAllService: FindAllFlashcardService,
    private readonly deleteService: DeleteFlashcardService,
  ) {}

  @Get('/list/deck/:deckId')
  async findAll(@Param('deckId') deckId: string): Promise<FlashcardEntity[]> {
    return await this.findAllService.execute(Number(deckId));
  }

  @Post('/create')
  async create(@Body() data: CreateFlashcardDto): Promise<FlashcardEntity> {
    return await this.createService.execute(data);
  }

  @Put('/update/:id/deck/:deckId')
  async update(
    @Param('id') id: string,
    @Param('deckId') deckId: string,
    @Body() data: UpdateFlashcardDto,
  ): Promise<FlashcardEntity> {
    return await this.updateService.execute(Number(id), Number(deckId), data);
  }

  @Delete('/delete/:id/deck/:deckId')
  async delete(
    @Param('id') id: string,
    @Param('deckId') deckId: string,
  ): Promise<string> {
    await this.deleteService.execute(Number(id), Number(deckId));
    return 'deleted';
  }
}
