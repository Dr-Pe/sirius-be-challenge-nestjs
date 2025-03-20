import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    player1id: number;

    @Column()
    player2id: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    startTime: Date;

    @Column({ nullable: true })
    endTime: Date;

    @Column({ nullable: true })
    winnerId: number;

    @Column()
    tableNumber: number;
}
