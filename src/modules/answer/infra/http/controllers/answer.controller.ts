import { AnswerEntity } from '@modules/answer/domain/entities/answer.entity';
import { CreateAnswerDto } from '@modules/answer/dto/create-answer.dto';
import { UpdateAnswerDto } from '@modules/answer/dto/update-answer.dto';
import { CreateAnswerService } from '@modules/answer/services/create-answer.service';
import { DeleteAnswerService } from '@modules/answer/services/delete-answer.service';
import { FindAllAnswerService } from '@modules/answer/services/find-answer.service';
import { UpdateAnswerService } from '@modules/answer/services/update-answer.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('Answer')
export class AnswerController {
  constructor(
    private readonly createService: CreateAnswerService,
    private readonly updateService: UpdateAnswerService,
    private readonly findAllService: FindAllAnswerService,
    private readonly deleteService: DeleteAnswerService,
  ) {}

  @Get('/list')
  async findAll(): Promise<AnswerEntity[]> {
    return await this.findAllService.execute();
  }

  @Post('/create')
  async create(@Body() data: CreateAnswerDto): Promise<AnswerEntity> {
    return await this.createService.execute(data);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateAnswerDto,
  ): Promise<string> {
    await this.updateService.execute(Number(id), data);
    return 'updated'
  }

  @Delete('/delete')
  async delete(@Param('id') id: string): Promise<string> {
    await this.deleteService.execute(Number(id));
    return 'deleted';
  }
}
