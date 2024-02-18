import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: any): Promise<User> {
    const existingUser = await this.findOne(createUserDto.email);
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    }

    throw new HttpException(
      {
        status: 'error',
        code: HttpStatus.BAD_REQUEST,
        message: 'User already exists',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  async getAllUsers() {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(email) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  async updateUserAvatar(media, userId) {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { avatar: media.path },
      { new: true },
    );

    return user;
  }
}
