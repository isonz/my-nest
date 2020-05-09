import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  HttpStatus,
  Body,
  Put,
  Delete,
  UseFilters,
  UsePipes,
  UseGuards,
  SetMetadata,
  UseInterceptors
} from "@nestjs/common";
import { Request, Response } from 'express';
import { HttpCode, Header, Redirect, Query, Param, HttpException } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './service/cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from "../common/exception/forbidden.exception";
import { HttpExceptionFilter } from "../common/exception/http-exception.filter";
import { JoiValidationPipe } from "../common/pipe/JoiValidationPipe";
import { createCatSchema } from "./create-cat.schema";
import { ValidationPipe } from "../common/pipe/validation.pipe";
import { RolesGuard } from "../common/guard/roles.guard";
import { Roles } from "../common/guard/roles.decorator";
import { LoggingInterceptor } from "../common/interceptor/logging.interceptor";
import { User } from "../common/decorator/user.decorator";
import { UserEntity } from "./entity/user.entity";


@Controller('cats')
// @UseFilters(new HttpExceptionFilter())   //整个控制器上定义异常格式
export class CatsController {

  constructor(private readonly catsService: CatsService) {
  }

  @Get()
  index(@Req() request: Request): string {
    return 'This is Cats index.' + request.ip;
  }

  @Get('news')
  @UseGuards(RolesGuard)
  news(): string {
    return 'This is Cats news.';
  }

  @Get('a*d')
  @UseInterceptors(LoggingInterceptor)
  findAll(): string {
    return 'This route uses a wildcard';
  }

  @Post('create')
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create() {
    return 'This action adds a new cat';
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  @Header('Cache-Control', 'none')
  redirect() {
    return 'This action is a redirect';
  }

  // /cats/docs?version=5
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // @Get('id/:id')
  // findOne(@Param() params): string {
  //   // console.log(params.id);
  //   return `This action returns a #${params.id} cat`;
  // }

  // http://127.0.0.1:3000/cats/id/1
  @Get('id/:id')
  findOne2(@Param('id') id): string {
    return `This action returns id #${id} cat`;
  }

  @Get('status')
  findAll2(@Res() res: Response) {
    res.status(HttpStatus.OK).json([]);
  }



  @Get('body')
  async body(@Body() s: string) {
    // return 'This is a body request.';
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, 403);
  }

  @Get('faex')
  async findAllException() {
    throw new ForbiddenException();
  }

  @Post('create_hef')
  // @UseFilters(new HttpExceptionFilter())
  @UseFilters(HttpExceptionFilter)
  async create_hef(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
  }

  @Post('create_roles')
  // @SetMetadata('roles', ['admin'])
  @Roles('admin')
  async create_roles(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }



  @Get('async')
  async asyncFindAll(): Promise<any[]> {
    return [];
  }

  @Post('create_dto')
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async create_dto(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Post('create_pipes')
  //@UsePipes(new ValidationPipe())
  @UsePipes(ValidationPipe)
  async create_pipes(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get('find_on_user')
  async findOneUser(@User() user: UserEntity) {
    console.log(user);
  }

  @Get('find_user_name')
  async findOneByName(@User('name') name: string) {
    console.log(`Hello ${name}`);
  }

  @Get('find_pip_user')
  async findOnePipUser(@User(new ValidationPipe()) user: UserEntity) {
    console.log(user);
  }


  @Get()
  findAll3(@Query() query: CreateCatDto) {
    return `This action returns all cats (limit: ${query.age} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: CreateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }



  @Post('add')
  async creates(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get('all')
  async findAlls(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

}
