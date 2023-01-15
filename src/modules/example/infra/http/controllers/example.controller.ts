import { ExampleEntity } from '@modules/example/domain/entities/example.entity';
import { CreateExampleDto } from '@modules/example/dto/create-example.dto';
import { UpdateExampleDto } from '@modules/example/dto/update-example.dto';
import { CreateExampleService } from '@modules/example/services/create-example.service';
import { DeleteExampleService } from '@modules/example/services/delete-example.service';
import { FindAllExampleService } from '@modules/example/services/find-example.service';
import { UpdateExampleService } from '@modules/example/services/update-example.service';
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

@Controller('example')
export class ExampleController {
  constructor(
    private readonly createService: CreateExampleService,
    private readonly updateService: UpdateExampleService,
    private readonly findAllService: FindAllExampleService,
    private readonly deleteService: DeleteExampleService,
  ) {}

  @Get('/list')
  async findAll(): Promise<ExampleEntity[]> {
    return await this.findAllService.execute();
  }

  @Post('/create')
  async create(@Body() data: CreateExampleDto): Promise<ExampleEntity> {
    return await this.createService.execute(data);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateExampleDto,
  ): Promise<ExampleEntity> {
    return await this.updateService.execute(Number(id), data);
  }

  @Delete('/delete')
  async delete(@Param('id') id: string): Promise<string> {
    await this.deleteService.execute(Number(id));
    return 'deleted';
  }
}
