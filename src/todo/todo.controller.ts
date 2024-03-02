import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    console.log(req.user.sub); // Access user information from the JWT token
    createTodoDto.user_id = req.user.sub;
    return this.todoService.createTodo(createTodoDto);
  }

  @Post('runTest')
  @UseGuards(JwtAuthGuard)
   createLoop(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    //  console.log('createTodoDto',createTodoDto);
     createTodoDto.user_id = req.user.sub;
      this.todoService.runTest(createTodoDto,1000);
      // this.todoService.createTodoWithQueue(createTodoDto);
      return 'Message sent and received successfully!';
  }
  
  @Get('send-receive-message')
  async sendAndReceiveMessage(): Promise<string> {
    await this.todoService.sendAndReceiveMessage();
    return 'Message sent and received successfully!';
  }

  @Get()
  findAll() {
    // return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(1);
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete()
  remove(@Param('id') id: string) {
    return this.todoService.remove();
  }
}
