import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    player1id: number;

    @Column()
    player2id: number;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @Column()
    winnerId: number;

    @Column()
    tableNumber: number;
}
