import { DeckEntity } from '@modules/deck/domain/entities/deck.entity';
import { CreateDeckDto } from '@modules/deck/dto/create-deck.dto';
import { UpdateDeckDto } from '@modules/deck/dto/update-deck.dto';
import { CreateDeckService } from '@modules/deck/services/create-deck.service';
import { DeleteDeckService } from '@modules/deck/services/delete-deck.service';
import { FindAllDeckService } from '@modules/deck/services/find-deck.service';
import { UpdateDeckService } from '@modules/deck/services/update-deck.service';
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

@Controller('deck')
export class DeckController {
  constructor(
    private readonly createService: CreateDeckService,
    private readonly updateService: UpdateDeckService,
    private readonly findAllService: FindAllDeckService,
    private readonly deleteService: DeleteDeckService,
  ) {}

  @Get('/list')
  async findAll(): Promise<DeckEntity[]> {
    return await this.findAllService.execute();
  }

  @Post('/create')
  async create(@Body() data: CreateDeckDto): Promise<DeckEntity> {
    return await this.createService.execute(data);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateDeckDto,
  ): Promise<DeckEntity> {
    return await this.updateService.execute(Number(id), data);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.deleteService.execute(Number(id));
    return 'deleted';
  }
}
