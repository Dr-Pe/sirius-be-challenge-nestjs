import { IsString, IsInt, IsNotEmpty, IsOptional, IsDate } from 'class-validator';

export class CreateMatchDto {
    @IsInt()
    @IsNotEmpty()
    player1id: number;

    @IsInt()
    @IsNotEmpty()
    player2id: number;

    @IsDate()
    @IsOptional()
    startTime: Date;

    @IsDate()
    @IsOptional()
    endTime: Date;

    @IsInt()
    @IsOptional()
    winnerId: number;

    @IsInt()
    @IsNotEmpty()
    tableNumber: number;
}
