import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './schemas/room.schema';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Query(() => [Room], { name: 'rooms' })
  async getRooms() {
    return this.roomsService.findAll();
  }

  @Mutation(() => Room)
  async createRoom(@Args('name') name: string, @Args('type') type: string) {
    return this.roomsService.create({ name, type });
  }
}