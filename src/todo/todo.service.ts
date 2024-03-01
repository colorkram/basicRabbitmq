import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    // private todoService: TodoService,
    private readonly rabbitMQService: RabbitmqService,
  ) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const { name, user_id } = createTodoDto;

      // Check if the user exists
      const user = await this.userRepository.findOne({
        where: { id: user_id },
      });

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

  async createTodoWithQueue(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const { name, user_id } = createTodoDto;

      // Check if the user exists
      const user = await this.userRepository.findOne({
        where: { id: user_id },
      });

      if (!user) {
        throw new BadRequestException(`User with id ${user_id} not found`);
      }

      // Save the new todo
      const todo = await this.todoRepository.save({
        name: name,
        user: user,
      });

      // Send a message to the RabbitMQ queue
      await this.rabbitMQService.sendMessage(
        'todo_queue',
        JSON.stringify(todo),
      );

      return todo;
    } catch (error) {
      // Handle specific errors if needed, or rethrow the error
      throw new BadRequestException(error);
    }
  }

  async sendAndReceiveMessage(): Promise<void> {
    const queue = 'example_queue';

    // Send a message
    await this.rabbitMQService.sendMessage(queue, 'Hello RabbitMQ!');

    // Receive a message
    await this.rabbitMQService.receiveMessage(queue, (message) => {
      console.log('Received message:', message);
    });
  }

  async runTest(createTodoDto: CreateTodoDto, iterations) {
    let todos;
    let num = 1;
    // await this.rabbitMQService.receiveMessage('todo_queue', (message: any) => {
    //   console.log('com1', num++, todos?.id);
    // });
    for (let i = 0; i < iterations; i++) {

        console.log(`Running test ${i + 1} of ${iterations}`);

      const todo = await this.createTodoWithQueue(createTodoDto);
      todos = todo;
    }

    return todos;
  }

  findAll() {
    return `This action returns all todo`;
  }

  async findOne(id: number) {
    try {
      const queryBuilder = await this.todoRepository.findOne({
        where: { id: id },
      });
      return queryBuilder;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  async remove(): Promise<void> {
    try {
      // Delete all records in the Todo table
      await this.todoRepository.clear();
    } catch (error) {
      // Handle specific errors if needed, or rethrow the error
      throw new NotFoundException('Error deleting todos', error.message);
    }
  }
}
