import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Player } from './players/entities/player.entity';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test',
      entities: [
        Player,
      ],
      synchronize: true, // WARNING: DO NOT USE IN PRODUCTION
    }),
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
