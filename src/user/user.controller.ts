import {
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
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
    const user = await this.userService.findOne(req.user.email);
    if (req.body.avatar) {
      user.avatar = req.body.avatar;
      user.save();
    }

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req: any) {
    console.log('user profile calling...');
    const user = await this.userService.findOne(req.user.email);
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }
}
