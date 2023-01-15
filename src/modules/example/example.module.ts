import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleEntity } from './domain/entities/example.entity';
import { ExampleController } from './infra/http/controllers/example.controller';
import { ExampleRepository } from './infra/repositories/typeorm/example.repository';
import { CreateExampleService } from './services/create-example.service';
import { DeleteExampleService } from './services/delete-example.service';
import { FindAllExampleService } from './services/find-example.service';
import { UpdateExampleService } from './services/update-example.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExampleEntity])],
  controllers: [ExampleController],
  providers: [
    ExampleRepository,
    CreateExampleService,
    UpdateExampleService,
    FindAllExampleService,
    DeleteExampleService,
  ],
})
export class ExampleModule {}
