import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { User } from 'src/users/models/user.model';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('register')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseDto<User | void>> {
    try {
      const result = await this.authService.signUp(createUserDto);
      return {
        message: 'User registered succesfully!',
        success: true,
        data: [result],
      };
    } catch (error) {
      throw error;
    }
  }
}