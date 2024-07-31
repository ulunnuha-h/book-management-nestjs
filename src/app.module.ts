import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequalizeConfig } from './config/sequalize.config';

@Module({
  imports: [BooksModule, SequelizeModule.forRoot(getSequalizeConfig())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
