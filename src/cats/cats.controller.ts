import { Controller, Get, Post, Req, Res, HttpStatus, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpCode, Header, Redirect, Query, Param, HttpException } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  index(@Req() request: Request): string {
    return 'This is Cats index.';
  }

  @Get('news')
  news(): string {
    return 'This is Cats news.';
  }

  @Get('a*d')
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

}
