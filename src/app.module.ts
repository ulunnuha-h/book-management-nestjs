import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './resource/books/books.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequalizeConfig } from './config/sequalize.config';
import { AuthModule } from './resource/auth/auth.module';
import { UsersModule } from './resource/users/users.module';
import { ChaptersModule } from './resource/chapters/chapters.module';

@Module({
  imports: [
    BooksModule,
    SequelizeModule.forRoot(getSequalizeConfig()),
    AuthModule,
    UsersModule,
    ChaptersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
