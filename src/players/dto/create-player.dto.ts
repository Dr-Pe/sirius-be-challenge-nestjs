import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePlayerDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsInt()
    @IsOptional()
    readonly ranking: number;

    @IsString()
    @IsOptional()
    readonly preferredCue: string;
}
