import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { roomAttributes } from '../mocks/roomPayload';
import { RoomAttributes } from '../../src/rooms/entities/roomAttributes.entity';

export const createRoom = async (
  app: INestApplication,
  accessToken: string,
): Promise<RoomAttributes> => {
  const response = await request(app.getHttpServer())
    .post('/rooms')
    .set('Authorization', accessToken)
    .send(roomAttributes)
    .expect(201);

  return response.body;
};
