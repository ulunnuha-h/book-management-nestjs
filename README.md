## Deskripsi Projek

Book Management APIs adalah layanan yang memungkinkan seseorang untuk menambah, membaca, memperbarui, dan menghapus data buku.

Dalam proyek ini, saya sering menggunakan Design Pattern Decorator. Pada setiap file di resource, seperti controller atau service, terdapat penggunaan decorator yang mempermudah pengembangan aplikasi.

Berikut adalah salah satu contoh penggunaan decorator pada file controller

```bash
@Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<ResponseDto<any>> {
    try {
      const result = await this.booksService.update(+id, updateBookDto);
      return {
        message: "Changes updated succesfully!",
        success: true,
        data: [],
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
```

Pada contoh di atas, salah satu decorator digunakan untuk menentukan metode pada API, apakah itu @Get, @Post, @Delete, atau @Patch. Untuk mengubah metode yang digunakan, kita hanya perlu mengubah decorator tanpa mengubah struktur kode. Contoh lainnya adalah decorator @Param untuk mengambil parameter dan @Body untuk mengambil body dari permintaan klien. Tanpa menggunakan decorator, data dari body dan parameter perlu diambil dari objek Request yang mengharuskan perubahan pada isi kode.

## Instalasi

```bash
$ npm install
```

## Mejalankan Aplikasi

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
