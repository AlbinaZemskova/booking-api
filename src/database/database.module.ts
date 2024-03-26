import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DefaultDbConfigService from './databaseConfig.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DefaultDbConfigService,
    }),
  ],
})
export class DatabaseModule {}
