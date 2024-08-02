import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { BooksService } from 'src/books/books.service';

@Controller('chapters')
export class ChaptersController {
  constructor(
    private readonly chaptersService: ChaptersService,
    private readonly bookService: BooksService,
  ) {}

  @Post(':bookId')
  async create(
    @Body() createChapterDto: CreateChapterDto,
    @Param('bookId') bookId: string,
  ): Promise<ResponseDto<any>> {
    try {
      createChapterDto.bookId = +bookId;
      const book = await this.bookService.findOne(+bookId);

      if (book == null) {
        throw new BadRequestException('No book with provided id!');
      }

      const result = await this.chaptersService.create(createChapterDto);
      return {
        message: 'Chapter created succesfully!',
        success: true,
        data: [result],
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':bookId')
  async findAll(@Param('bookId') bookId: string) {
    try {
      const book = await this.bookService.findOne(+bookId);

      if (book == null) {
        throw new BadRequestException('No book with provided id!');
      }

      const result = await this.chaptersService.findAll(+bookId);
      return {
        message: 'Chapters retrived succesfully!',
        success: true,
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':bookId/:id')
  async findOne(@Param('id') id: string, @Param('bookId') bookId: string) {
    try {
      const book = await this.bookService.findOne(+bookId);

      if (book == null) {
        throw new BadRequestException('No book with provided id!');
      }
      const result = await this.chaptersService.findOne(+bookId, +id);
      if (result == null)
        throw new NotFoundException('Chapter with provided id not found!');

      return {
        message: 'Chapter retrived succesfully!',
        success: true,
        data: [result],
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':bookId/:id')
  async update(
    @Param('id') id: string,
    @Param('bookId') bookId: string,
    @Body() updateChapterDto: UpdateChapterDto,
  ) {
    try {
      const result = await this.chaptersService.update(
        +bookId,
        +id,
        updateChapterDto,
      );

      return {
        message: 'Chapter updated succesfully!',
        success: true,
        data: [result],
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':bookId/:id')
  async remove(@Param('id') id: string, @Param('bookId') bookId: string) {
    try {
      const result = await this.chaptersService.remove(+bookId, +id);

      if (result == 0) {
        throw new BadRequestException('No chapter with provided id!');
      }

      return {
        message: 'Chapter deleted succesfully!',
        success: true,
        data: [result],
      };
    } catch (error) {
      throw error;
    }
  }
}
