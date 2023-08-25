import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/createUserDto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly bcryptService: BcryptService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll() {
    return await this.userModel.find();
  }

  async find(username: string) {
    return await this.userModel.findOne({ username: username });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.bcryptService.hashPassword(
        createUserDto.password,
      );
      const user = new this.userModel(createUserDto);

      await user.save();
      return true;
    } catch (error) {
      return false;
    }
  }
}
