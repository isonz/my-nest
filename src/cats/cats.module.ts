import { Global, Module } from "@nestjs/common";
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "../common/exception/http-exception.filter";

@Global()
@Module({
  controllers: [CatsController],
  exports: [CatsService],
  providers: [
    CatsService,
    // 模块上自定义异常的格式
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // }
  ]
})
export class CatsModule {

}
