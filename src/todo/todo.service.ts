import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    // private todoService: TodoService,
    
  ) { }
  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const { name, user_id } = createTodoDto;

      // Check if the user exists
      const user = await this.userRepository.findOne({ where: { id: user_id } });

      if (!user) {
        throw new NotFoundException(`User with id ${user_id} not found`);
      }

      // Save the new todo
      const todo = await this.todoRepository.save({
        name: name,
        user: user, // assuming a relationship between Todo and User entities
      });

      return todo;
    } catch (error) {
      // Handle specific errors if needed, or rethrow the error
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return `This action returns all todo`;
  }

  async findOne(id: number) {
   try {
    const queryBuilder = await this.todoRepository.findOne({where:{id:id}})
    return queryBuilder
   } catch (error) {
    throw new BadRequestException(error)
   }
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
