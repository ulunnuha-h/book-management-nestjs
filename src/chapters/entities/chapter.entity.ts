import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Chapter extends Model<Chapter> {
  @Column({ type: DataType.STRING })
  title: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookId: number;

  @Column({ type: DataType.INTEGER })
  totalPage: number;
}
