import { TagEntity } from '@modules/tag/domain/entities/tag.entity';
import { CreateTagDto } from '@modules/tag/dto/create-tag.dto';
import { UpdateTagDto } from '@modules/tag/dto/update-tag.dto';
import { CreateTagService } from '@modules/tag/services/create-tag.service';
import { DeleteTagService } from '@modules/tag/services/delete-tag.service';
import { FindAllTagService } from '@modules/tag/services/find-tag.service';
import { UpdateTagService } from '@modules/tag/services/update-tag.service';
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

@Controller('tag')
export class TagController {
  constructor(
    private readonly createService: CreateTagService,
    private readonly updateService: UpdateTagService,
    private readonly findAllService: FindAllTagService,
    private readonly deleteService: DeleteTagService,
  ) {}

  @Get('/list')
  async findAll(): Promise<TagEntity[]> {
    return await this.findAllService.execute();
  }

  @Post('/create')
  async create(@Body() data: CreateTagDto): Promise<TagEntity> {
    return await this.createService.execute(data);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateTagDto,
  ): Promise<TagEntity> {
    return await this.updateService.execute(Number(id), data);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.deleteService.execute(Number(id));
    return 'deleted';
  }
}
