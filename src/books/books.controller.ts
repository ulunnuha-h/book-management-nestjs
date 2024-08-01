import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { ResponseDto } from 'src/dto/response.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './models/book.model';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<ResponseDto<Book | void>> {
    try {
      const result = await this.booksService.create(createBookDto);
      return {
        message: 'Book created succesfully!',
        success: true,
        data: [result],
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<ResponseDto<Book | void>> {
    try {
      const result = await this.booksService.findAll();
      return {
        message: 'Books retrived succesfully!',
        success: true,
        data: result,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<Book | void>> {
    try {
      const result = await this.booksService.findOne(+id);
      if (result == null) throw new NotFoundException();
      return {
        message: 'Book retrived succesfully!',
        success: true,
        data: [result],
      };
    } catch (error) {
      if (error.status == 404) {
        throw new NotFoundException();
      }

      throw new BadRequestException();
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<ResponseDto<any>> {
    try {
      const result = await this.booksService.update(+id, updateBookDto);
      return {
        message: `${result[0]} Changes updated succesfully!`,
        success: true,
        data: [],
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseDto<any>> {
    try {
      const result = await this.booksService.remove(+id);
      return {
        message: `${result[0]} Book(s) deleted succesfully!`,
        success: true,
        data: [],
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
