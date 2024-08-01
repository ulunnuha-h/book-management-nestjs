import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [UsersModule, JwtModule.register(getJwtConfig())],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
