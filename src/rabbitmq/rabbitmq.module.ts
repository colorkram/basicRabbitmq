// rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqController } from './rabbitmq.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [RabbitmqService],
  controllers: [RabbitmqController],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
