import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Watchlist } from './watchlist';

@Entity()
export class Video extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: Number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    name!: String;

    @Column({
        type: 'varchar',
        length: 255,
    })
    url!: String;

    @Column({
        type: 'boolean',
        default: false

    })
    isDeleted!: boolean

    @ManyToOne(() => Watchlist, (watchlist) => watchlist.videos)
    watchlist!: Watchlist;
}


