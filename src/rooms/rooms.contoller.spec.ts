import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomAttributes } from './entities/roomAttributes.entity';
import { signUpAdmin } from '../../test/utils/auth';
import { createRoom } from '../../test/utils/room';
import createApp from '../../test/utils/createApp';
import { roomAttributes } from '../../test/mocks/roomPayload';

describe('RoomsController', () => {
  let controller: RoomsController;
  let token: string;
  let app: INestApplication;
  let testingModule: TestingModule;

  beforeEach(async () => {
    app = await createApp(null, (mod: TestingModule) => (testingModule = mod));

    controller = testingModule.get<RoomsController>(RoomsController);

    token = await signUpAdmin(testingModule);
    await createRoom(app, token);

    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get room by id', async () => {
    const roomId = 1;

    const room: RoomAttributes = {
      ...roomAttributes,
      RoomID: roomId,
      RoomAttributesID: 1,
      isAvailable: true,
    };

    const req = { params: { roomId: roomId.toString() } };

    const result = await controller.getRoomById(req as any);

    expect(result).toEqual(room);
  });
});
