import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Match } from './matches/entities/match.entity';
import { MatchesModule } from './matches/matches.module';
import { Player } from './players/entities/player.entity';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test',
      entities: [
        Match,
        Player,
      ],
      synchronize: true, // WARNING: DO NOT USE IN PRODUCTION
    }),
    PlayersModule,
    MatchesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
