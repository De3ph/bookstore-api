import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoreDto } from './dto/createStoreDto';
import { Store } from 'src/schemas/store.schema';
import { GetStoresDto } from './dto/getStoresDto';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private readonly storeModel: Model<Store>,
  ) {}

  async getAll(): Promise<GetStoresDto> {
    const res = new GetStoresDto();
    const stores = await this.storeModel.find();
    stores.forEach((store) => {
      res.stores.push({
        _id: store._id,
        branchCode: store.branchCode,
        location: store.location,
        books: store.books,
      });
    });

    return res;
  }

  async create(createStoreDto: CreateStoreDto) {
    try {
      return await new this.storeModel(createStoreDto).save();
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
