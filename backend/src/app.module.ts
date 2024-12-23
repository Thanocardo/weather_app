import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users_data/entities/users_data.entity';
import { UsersDataModule } from './users_data/users_data.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { JwtModule } from '@nestjs/jwt';
import { FavoriteCitiesModule } from './favorite_cities/favorite_cities.module';
import { FavoriteCity } from './favorite_cities/entities/favorite_city.entity';
import { PopularCitiesModule } from './popular_cities/popular_cities.module';
import { PopularCity } from './popular_cities/entities/popular_city.entity';
import { RefreshTokenModule } from './refresh_token/refresh_token.module';
import { RefreshToken } from './refresh_token/entities/refresh_token.entity';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [config]
  }),
  JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get("jwt.secret")
      }),
      global: true,
      inject: [ConfigService]
    }),    
  TypeOrmModule.forRootAsync({
      useFactory: async (config) => ({
        type: 'postgres',
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        entities: [User, FavoriteCity, PopularCity, RefreshToken],
        synchronize: true,
      }),
      inject: [ConfigService]
  }), UsersDataModule, FavoriteCitiesModule, PopularCitiesModule, RefreshTokenModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
