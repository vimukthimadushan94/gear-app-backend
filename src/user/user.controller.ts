import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async createUser(@Req() request: Request) {
    const user = this.userService.create(request.body);
    return user;
  }

  @Get('/')
  getmethodsController() {
    const users = this.userService.getAllUsers();
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update-avatar')
  async updateAvatar(@Request() req: any) {
    console.log(req.user);
    const user = this.userService.findOne(req.user.email);

    return user;
  }
}
