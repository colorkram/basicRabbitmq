import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User]), /* possibly another module here */],
  
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TypeOrmModule, TodoService],
})
export class TodoModule {}

