import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './models/book.model';
import { CreateBookDto } from './dto/create-book.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private readonly bookModel: typeof Book,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<ResponseDto<any>> {
    try {
      const result = await this.bookModel.create(createBookDto);
      return {
        message: 'Book created successfully',
        success: true,
        data: [result],
      };
    } catch (error) {
      return {
        message: 'Failed to create book',
        success: false,
        data: [error],
      };
    }
  }

  async findAll(): Promise<ResponseDto<any>> {
    try {
      const result = await this.bookModel.findAll();
      return {
        message: 'Books retrived successfully',
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        message: 'Failed to retrive books',
        success: false,
        data: [error],
      };
    }
  }

  async findOne(id: number): Promise<ResponseDto<any>> {
    try {
      const result = await this.bookModel.findByPk(id);
      if (result == null) throw 'Cannot find the required book';

      return {
        message: 'Book retrived successfully',
        success: true,
        data: [result],
      };
    } catch (error) {
      return {
        message: 'Failed to retrive books',
        success: false,
        data: [error],
      };
    }
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<ResponseDto<any>> {
    try {
      const result = await this.bookModel.update(updateBookDto, {
        where: { id },
      });
      return {
        message: 'Book updated successfully',
        success: true,
        data: [result],
      };
    } catch (error) {
      return {
        message: 'Failed to update book',
        success: false,
        data: [error],
      };
    }
  }

  async remove(id: number) {
    try {
      const result = await this.bookModel.destroy({ where: { id } });
      return {
        message: 'Book deleted successfully',
        success: true,
        data: [result],
      };
    } catch (error) {
      return {
        message: 'Failed to delete book',
        success: false,
        data: [error],
      };
    }
  }
}
