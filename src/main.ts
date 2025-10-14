import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { bootstrapAdmin } from './seed/bootstrap';
import { ConfigService } from '@nestjs/config';
import { HashAdapter } from './common/interfaces/hash.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //------
  //El app.get accede a una instancia específica registrada en el contenedor de dependencias de la aplicacion
  const dataSource = app.get(DataSource);
  const config = app.get(ConfigService);
  const hasher = app.get<HashAdapter>('HashAdapter');
  await bootstrapAdmin(dataSource, config, hasher);
  //------
  // app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
