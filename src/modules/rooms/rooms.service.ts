import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Model } from 'mongoose';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  @CacheKey('rooms')
  @CacheTTL(60)
  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async create(roomData: Partial<Room>): Promise<Room> {
    const newRoom = new this.roomModel(roomData);
    return newRoom.save();
  }
}