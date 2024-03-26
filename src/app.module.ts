import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, AuthenticationModule, RoomsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
