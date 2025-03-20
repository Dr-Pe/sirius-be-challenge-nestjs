import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { NotFoundError } from 'src/errors/notFound.error';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) { }

  @Post()
  async create(@Body() createMatchDto: CreateMatchDto) {
    try {
      return await this.matchesService.create(createMatchDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return new NotFoundException(error.message);
      }
      return error;
    }
  }

  @Get()
  findAll() {
    return this.matchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    try {
      return await this.matchesService.update(+id, updateMatchDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return new NotFoundException(error.message);
      }
      return error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchesService.remove(+id);
  }
}
