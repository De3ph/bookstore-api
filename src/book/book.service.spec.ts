import { Test } from '@nestjs/testing';
import { BookService } from './book.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../schemas/book.schema';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

describe('BookService', () => {
  let service: BookService;
  let model: Model<Book>;

  const mockBook = {
    title: 'Şiirler',
    author: '64e9bc763baeb7360e105880',
    price: 23.9,
    ISBN: 'NRAN-215123',
    language: 'Türkçe',
    numberOfPages: 56,
    publisher: 'Altın Kitap',
  };

  const mockBookService = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBookService,
        },
        {
          provide: APP_PIPE,
          useExisting: ValidationPipe,
        },
        ValidationPipe,
      ],
    }).compile();

    service = moduleRef.get<BookService>(BookService);
    model = moduleRef.get<Model<Book>>(getModelToken(Book.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('first', () => {
    it('getAll', async () => {
      /*
        aşağıdaki satır, mongo db deki fonksiyon şu değeri dönmeli diyoruz      

      */
      jest.spyOn(model, 'find').mockResolvedValue([mockBook]);
      const res = await service.getAll();
      expect(model.find).toHaveBeenCalled();
      expect(res).toEqual([mockBook]);
    });
  });
});
