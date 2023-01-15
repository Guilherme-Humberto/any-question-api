import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { LoginUserOutPut, SessionUserDto } from '@modules/user/dto/session-user.dto';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';
import { CreateUserService } from '@modules/user/services/create-user.service';
import { DeleteUserService } from '@modules/user/services/delete-user.service';
import { FindAllUserService } from '@modules/user/services/find-user.service';
import { SessionUserService } from '@modules/user/services/session-user.service';
import { UpdateUserService } from '@modules/user/services/update-user.service';
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

@Controller('User')
export class UserController {
  constructor(
    private readonly sessionService: SessionUserService,
    private readonly createService: CreateUserService,
    private readonly updateService: UpdateUserService,
    private readonly findAllService: FindAllUserService,
    private readonly deleteService: DeleteUserService,
  ) {}

  @Get('/list')
  async findAll(): Promise<UserEntity[]> {
    return await this.findAllService.execute();
  }

  @Post('/create')
  async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    return await this.createService.execute(data);
  }

  @Post('/login')
  async login(@Body() data: SessionUserDto): Promise<LoginUserOutPut> {
    return await this.sessionService.execute(data);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.updateService.execute(Number(id), data);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.deleteService.execute(Number(id));
    return 'deleted';
  }
}
