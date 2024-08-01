import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const { username, password } = signInDto;
    try {
      const user = await this.usersService.findOne(username);
      if (user?.password !== password) {
        throw new UnauthorizedException('Username or password is incorrect!');
      }

      const { id, email } = user;
      const payload = { id, email, username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.usersService.findOne(createUserDto.username);
      if (user != null) {
        throw new BadRequestException('Username has been used!');
      }

      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }
}
