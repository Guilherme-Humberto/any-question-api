import { FormEntity } from '@modules/form/domain/entities/form.entity';
import { CreateFormDto } from '@modules/form/dto/create-form.dto';
import { UpdateFormDto } from '@modules/form/dto/update-form.dto';
import { CreateFormService } from '@modules/form/services/create-form.service';
import { DeleteFormService } from '@modules/form/services/delete-form.service';
import { FindAllFormService } from '@modules/form/services/find-form.service';
import { UpdateFormService } from '@modules/form/services/update-form.service';
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

@Controller('Form')
export class FormController {
  constructor(
    private readonly createService: CreateFormService,
    private readonly updateService: UpdateFormService,
    private readonly findAllService: FindAllFormService,
    private readonly deleteService: DeleteFormService,
  ) {}

  @Get('/list')
  async findAll(): Promise<FormEntity[]> {
    return await this.findAllService.execute();
  }

  @Post('/create')
  async create(@Body() data: CreateFormDto): Promise<FormEntity> {
    return await this.createService.execute(data);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateFormDto,
  ): Promise<FormEntity> {
    return await this.updateService.execute(Number(id), data);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.deleteService.execute(Number(id));
    return 'deleted';
  }
}
