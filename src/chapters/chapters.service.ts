import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Chapter } from './entities/chapter.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel(Chapter)
    private readonly chapterModel: typeof Chapter,
  ) {}

  async create(createChapterDto: CreateChapterDto) {
    return this.chapterModel.create(createChapterDto);
  }

  async findAll(bookId: number) {
    return this.chapterModel.findAll({ where: { bookId } });
  }

  async findOne(bookId: number, id: number) {
    return this.chapterModel.findOne({ where: { bookId, id } });
  }

  async update(bookId: number, id: number, updateChapterDto: UpdateChapterDto) {
    return this.chapterModel.update(updateChapterDto, {
      where: { bookId, id },
    });
  }

  async remove(bookId: number, id: number) {
    return this.chapterModel.destroy({ where: { bookId, id } });
  }
}
