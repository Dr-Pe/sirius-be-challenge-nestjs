import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { NotFoundError } from 'src/errors/notFound.error';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
  ) { }

  create(createPlayerDto: CreatePlayerDto) {
    return this.playersRepository.save(createPlayerDto);
  }

  findAll() {
    return this.playersRepository.find();
  }

  findOne(id: number) {
    return this.playersRepository.findOneBy({ id: id });
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    let player = await this.playersRepository.findOneBy({ id: id });

    if (!player) {
      throw new NotFoundError(`Player ${id} not found`);
    }
    if (updatePlayerDto.name !== undefined) {
      player.name = updatePlayerDto.name;
    }
    if (updatePlayerDto.ranking !== undefined) {
      player.points = updatePlayerDto.ranking;
    }
    if (updatePlayerDto.preferredCue !== undefined) {
      player.preferredCue = updatePlayerDto.preferredCue;
    }

    return this.playersRepository.save(player);
  }

  remove(id: number) {
    return this.playersRepository.delete(id);
  }
}
