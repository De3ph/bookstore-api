import { CreateStoreDto } from './dto/createStoreDto';
import { Controller, Body, Post, Get } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  getAll() {
    return this.storeService.getAll();
  }

  @Post()
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }
}
