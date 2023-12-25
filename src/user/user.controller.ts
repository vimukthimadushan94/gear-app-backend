import { Controller, Get, Post, Req, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async createUser(@Req() request: Request) {
    const user = this.userService.create(request.body);
    return user;
  }

  @Get('/test')
  getmethodsController() {
    return 'test description';
  }
}
