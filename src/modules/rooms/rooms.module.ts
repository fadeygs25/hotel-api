import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Room extends Document {
  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  type: string;

  @Prop({ default: true })
  @Field()
  isAvailable: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);