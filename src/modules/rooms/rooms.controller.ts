import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './schemas/room.schema';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('rooms')
@UseInterceptors(CacheInterceptor)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Post()
  async create(@Body() roomData: Partial<Room>): Promise<Room> {
    return this.roomsService.create(roomData);
  }
}