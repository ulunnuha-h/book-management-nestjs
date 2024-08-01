import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './models/book.model';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private readonly bookModel: typeof Book,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<void | Book> {
    return this.bookModel.create(createBookDto);
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  async findOne(id: number): Promise<null | Book> {
    return this.bookModel.findByPk(id);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<[number]> {
    return this.bookModel.update(updateBookDto, { where: { id } });
  }

  async remove(id: number): Promise<number> {
    return this.bookModel.destroy({ where: { id } });
  }
}
