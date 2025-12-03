import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //------
  //El app.get accede a una instancia específica registrada en el contenedor de dependencias de la aplicacion

  const config = app.get(ConfigService);
  const seedService = app.get(SeedService);
  seedService.execute();

  //------
  //Habilitar los cors
  app.enableCors({
    origin: config.get<string>('API_FRONTEND'),
  });
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
