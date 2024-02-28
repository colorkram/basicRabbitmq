import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
  app.enableCors();
  // console.log(`application is running on: ${await app.getUrl()}/api`);
  console.log('start');
  
  // console.log(`server running on port:`, appConfig.app_port);
  // console.log(`app name:`, appConfig.app_name);
  // console.log(`environment:`, process.env.NODE_ENV);
  // console.log(`version:`, appConfig.version);
}
bootstrap();
