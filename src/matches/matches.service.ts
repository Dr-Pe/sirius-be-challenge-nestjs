import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'src/errors/notFound.error';
import { PlayersService } from 'src/players/players.service';
import { Repository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchesRepository: Repository<Match>,
    private readonly playersService: PlayersService
  ) { }

  async create(createMatchDto: CreateMatchDto) {
    let match = new Match();

    match.player1 = await this._findPlayerById(createMatchDto.player1id);
    match.player2 = await this._findPlayerById(createMatchDto.player2id);
    match.startTime = createMatchDto.startTime;
    match.endTime = createMatchDto.endTime;
    match.winner = await this._findPlayerById(createMatchDto.winnerId);
    match.tableNumber = createMatchDto.tableNumber;

    return this.matchesRepository.save(createMatchDto);
  }

  findAll() {
    return this.matchesRepository.find();
  }

  findOne(id: number) {
    return this.matchesRepository.findOneBy({ id: id });
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    let match = await this.matchesRepository.findOneBy({ id: id });

    if (!match) {
      throw new NotFoundError(`Match ${id} not found`);
    }
    if (updateMatchDto.player1id !== undefined) {
      match.player1 = await this._findPlayerById(updateMatchDto.player1id);
    }
    if (updateMatchDto.player2id !== undefined) {
      match.player2 = await this._findPlayerById(updateMatchDto.player2id);
    }
    if (updateMatchDto.startTime !== undefined) {
      match.startTime = updateMatchDto.startTime;
    }
    if (updateMatchDto.endTime !== undefined) {
      match.endTime = updateMatchDto.endTime;
    }
    if (updateMatchDto.winnerId !== undefined) {
      match.winner = await this._findPlayerById(updateMatchDto.winnerId);
    }
    if (updateMatchDto.tableNumber !== undefined) {
      match.tableNumber = updateMatchDto.tableNumber;
    }

    return this.matchesRepository.save(match);
  }

  remove(id: number) {
    return this.matchesRepository.delete(id);
  }

  async _findPlayerById(playerId: number) {
    const player = await this.playersService.findOne(playerId);

    if (!player) {
      throw new NotFoundError(`Player ${playerId} not found`);
    }

    return player;
  }
}