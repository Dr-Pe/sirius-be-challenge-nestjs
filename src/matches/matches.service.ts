import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchesRepository: Repository<Match>,
  ) { }

  create(createMatchDto: CreateMatchDto) {
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
      throw new Error('Match not found');
    }
    if (updateMatchDto.player1id !== undefined) {
      match.player1id = updateMatchDto.player1id;
    }
    if (updateMatchDto.player2id !== undefined) {
      match.player2id = updateMatchDto.player2id;
    }
    if (updateMatchDto.startTime !== undefined) {
      match.startTime = updateMatchDto.startTime;
    }
    if (updateMatchDto.endTime !== undefined) {
      match.endTime = updateMatchDto.endTime;
    }
    if (updateMatchDto.winnerId !== undefined) {
      match.winnerId = updateMatchDto.winnerId;
    }
    if (updateMatchDto.tableNumber !== undefined) {
      match.tableNumber = updateMatchDto.tableNumber;
    }

    return this.matchesRepository.save(match);
  }

  remove(id: number) {
    return this.matchesRepository.delete(id);
  }
}
