import { Controller, Request, Post, UseGuards, Get, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard } from "../auth/guards/local-auth.guard";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('users')
export class UsersController {

  constructor(private readonly authService: AuthService) {}

  @Get()
  index(): string {
    return 'This is Cats index.';
  }

  // @UseGuards(AuthGuard('local'))
  // @Post('login1')
  // async login_1(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile1')
  getProfile1(@Request() req) {
    return req.user;
  }



  // @UseGuards(LocalAuthGuard)
  //   // @Post('login2')
  //   // async login_2(@Request() req) {
  //   //   return this.authService.login(req.user);
  //   // }

  @UseGuards(JwtAuthGuard)
  @Get('profile2')
  getProfile2(@Request() req) {
    return req.user;
  }


}
