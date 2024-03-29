import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from 'src/schemas/author.schema';
import { CreateAuthorDto } from 'src/author/dto/createAuthorDto';
import { DeleteAuthorDto } from './dto/deleteAuthorDto';

@Injectable()
export class AuthorService {
  // buradaki @InjectModel; TypeORM deki @InjectRepository ile aynı görevi görüyor
  // database ile iletişimi sağlıyor

  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  async getAll() {
    return this.authorModel.find();
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    createAuthorDto.birthDate = new Date(createAuthorDto.birthDate);
    const author = new this.authorModel(createAuthorDto);
    return author.save();
  }

  async delete(deleteAuthorDto: DeleteAuthorDto) {
    return this.authorModel.deleteOne({
      _id: deleteAuthorDto.id,
    });
  }
}
