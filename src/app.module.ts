import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ENV_VALIDATION_SCHEMA } from './config/env.validation';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     transport: {
    //       target: 'pino-pretty',
    //       options: {
    //         messageKey: 'message',
    //         colorize: true,
    //         levelFirst: true,
    //         translateTime: 'SYS:standard',
    //       },
    //     },
    //     messageKey: 'message',
    //     customProps: (req: Request) => {
    //       return {
    //         correlationId: req[CORRELATION_ID_HEADER],
    //       };
    //     },
    //     //Para no hacer el logeo automatico
    //     // autoLogging: false,
    //     //Para que no añada información extra en el log
    //     serializers: {
    //       req: () => {
    //         return undefined;
    //       },
    //       res: () => {
    //         return undefined;
    //       },
    //     },
    //   },
    // }),
    //Para las variables de entorno
    ConfigModule.forRoot({
      //Para que el uso de COnfigModule sea global y no haya necesidad de importarlo en todos los modulos donde se usen
      // isGlobal: true,
      validationSchema: ENV_VALIDATION_SCHEMA,
    }),
    //Para configurar que TypeORM acceda a la BD
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        database: config.get<string>('DB_NAME'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        autoLoadEntities: true,
        //Cuando hacemos algún cambio en las entidades aumaticamente las sincroniza
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  // }
}
