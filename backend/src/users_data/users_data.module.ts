import { Module } from '@nestjs/common';
import { UsersDataService } from './users_data.service';
import { UsersDataController } from './users_data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users_data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersDataController],
  providers: [UsersDataService],
  exports: [UsersDataService],
})
export class UsersDataModule {}
