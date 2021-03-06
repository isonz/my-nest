import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from "./cats/cats.module";
import {LoggerMiddleware, loggerMiddleware } from "./common/middleware/logger.middleware";
import { CatsController } from "./cats/cats.controller";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CatsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, loggerMiddleware)
      // .exclude(
      //   { path: 'cats', method: RequestMethod.GET },
      //   { path: 'cats', method: RequestMethod.POST }
      // )
      //.forRoutes(CatsController);
      .forRoutes('cats');
      //.forRoutes({ path: 'cats', method: RequestMethod.GET });
      //.forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
  }
}
