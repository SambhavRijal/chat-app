import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Start the application on port 3002 (or any other port if needed)
  await app.listen(3002, () => {
    console.log('App running at port 3002');
  });
}

bootstrap().then(() => console.log('App started'));
