import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    return this.userModel.create(createUserDto);
  }

  async remove(username: string): Promise<any> {
    return this.userModel.destroy({ where: { username } });
  }
}
