import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoreDto } from './dto/createStoreDto';
import { Store } from 'src/schemas/store.schema';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private readonly storeModel: Model<Store>,
  ) {}

  async getAll() {
    return await this.storeModel.find();
  }

  async create(createStoreDto: CreateStoreDto) {
    try {
      return await new this.storeModel(createStoreDto).save();
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
