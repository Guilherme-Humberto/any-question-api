import { QuestionEntity } from '@modules/question/domain/entities/question.entity';
import { CreateQuestionDto } from '@modules/question/dto/create-question.dto';
import { UpdateQuestionDto } from '@modules/question/dto/update-question.dto';
import { CreateQuestionService } from '@modules/question/services/create-question.service';
import { DeleteQuestionService } from '@modules/question/services/delete-question.service';
import { FindAllQuestionService } from '@modules/question/services/find-question.service';
import { UpdateQuestionService } from '@modules/question/services/update-question.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly createService: CreateQuestionService,
    private readonly updateService: UpdateQuestionService,
    private readonly findAllService: FindAllQuestionService,
    private readonly deleteService: DeleteQuestionService,
  ) {}

  @Get('/list')
  async findAll(): Promise<QuestionEntity[]> {
    return await this.findAllService.execute();
  }

  @Post('/create')
  async create(@Body() data: CreateQuestionDto): Promise<QuestionEntity> {
    return await this.createService.execute(data);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    return await this.updateService.execute(Number(id), data);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.deleteService.execute(Number(id));
    return 'deleted';
  }
}
