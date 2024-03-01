// rabbitmq.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService {
  private readonly connection: Promise<amqp.Connection>;
  

  constructor() {
    this.connection = amqp.connect('amqp://colorkram:qwe1234@localhost');
  }

  async sendMessage(queue: string, message: string): Promise<void> {
try {
  const channel = await (await this.connection).createChannel();
  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(message));
  await channel.close();
} catch (error) {
  throw new BadRequestException(error)
}
  }

  async receiveMessage(queue: string, callback: (message: string) => void): Promise<void> {
    const channel = await (await this.connection).createChannel();
    await channel.assertQueue(queue, { durable: false });
    channel.prefetch(1);
  
    const handleConsume = (msg) => {
      if (msg) {
        callback(msg.content.toString());
        channel.ack(msg);
      } 
    };
  
    const handleChannelClose = () => {
      console.log('Channel closed.');
    };
  
    // Listen for the close event and remove the listeners
    channel.once('close', handleChannelClose);
  
    // Start consuming messages
    channel.consume(queue, handleConsume);
    // channel.consume(queue, handleConsume, { noAck: true });
    // await  (await this.connection).close();
  }
  
}
