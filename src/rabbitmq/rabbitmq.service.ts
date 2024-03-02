// rabbitmq.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as amqp from 'amqplib';
import { Todo } from 'src/todo/entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RabbitmqService {
  private readonly connection: Promise<amqp.Connection>;
  private channel: amqp.Channel;

  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {
    this.connection = amqp.connect('amqp://colorkram:qwe1234@localhost');
    this.createChannel();
  }

  private async createChannel(): Promise<void> {
    try {
      this.channel = await (await this.connection).createChannel();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async sendMessage(queue: string, message: any): Promise<void> {
    try {
      await this.channel.assertQueue(queue, { durable: false });
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  private a = 1;
  // async receiveMessage(
  //   queue: string,
  //   // callback: (message: string) => void,
  //   // path:string
  // ): Promise<void> {
  //   this.connection
  //     .then((conn) => conn.createChannel())
  //     .then((ch) =>
  //       ch.assertQueue(queue, { durable: false }).then((ok) =>
  //         ch.consume(queue, async (msg) => {
  //           if (msg !== null) {
  //             // console.log('55555', JSON.parse(msg.content.toString()));

  //             await this.todoRepository.save(
  //               JSON.parse(msg.content.toString()),
  //             );
  //             console.log('test', this.a++);

  //             ch.ack(msg);
  //           }
  //         }),
  //       ),
  //     )
  //     .catch(console.warn).finally(await this.ch.close())

  //   // const channel = await (await this.connection).createChannel();
  //   // await channel.assertQueue(queue, { durable: false });
  //   // // channel.prefetch(1);
  //   // // Start consuming messages
  //   // channel.consume(queue, async (msg) => {
  //   //   console.log(JSON.parse(msg.content.toString()));
  //   //   // console.log('get',this.a++);
  //   //   console.log('eiei');

  //   //     const todo = await this.todoRepository.save(JSON.parse(msg.content.toString()))
  //   //   channel.ack(msg);
  //   // });

  //   // channel.consume(queue, handleConsume, { noAck: true });
  //   // await  (await this.connection).close();
  // }
  async receiveMessage(queue: string): Promise<void> {
    try {
      const conn = await this.connection;
      const ch = await conn.createChannel();
  
      await ch.assertQueue(queue, { durable: false });
  
      await ch.consume(queue, async (msg) => {
        console.log(1);
        
        if (msg !== null) {
          console.log(2);
          await this.handleMessage(msg);
          ch.ack(msg);
        }
      });
  
      // Close the channel when done
      // await ch.close();
    } catch (error) {
      console.warn(error);
      // Handle the error as needed
    }
  }
  
  private async handleMessage(msg: amqp.Message): Promise<void> {
    try {
      const todoData = JSON.parse(msg.content.toString());
      await this.todoRepository.save(todoData);
      console.log('test', this.a++);
    } catch (error) {
      console.warn('Error handling message:', error);
      // Handle the error as needed
    }
  }
  
}
