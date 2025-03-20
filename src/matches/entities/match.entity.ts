import { Player } from 'src/players/entities/player.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Player, player => player.id)
    player1: Player;

    @ManyToOne(() => Player, player => player.id)
    player2: Player;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    startTime: Date;

    @Column({ nullable: true })
    endTime: Date;

    @ManyToOne(() => Player, player => player.id)
    winner: Player;

    @Column()
    tableNumber: number;
}
