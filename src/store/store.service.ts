import { CreateStoreDto } from './dto/createStoreDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const store = new this.storeModel(createStoreDto);
    return await store.save();
  }
}
