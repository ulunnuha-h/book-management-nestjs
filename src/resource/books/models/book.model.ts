import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Book extends Model<Book> {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  title: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  price: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
  })
  rating: number;
}
