import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';
import { Video } from './video';

@Entity()
export class Watchlist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: Number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name!: String;
    @Column({
        type: 'date',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt!: Date;

    @Column({
        type: 'boolean',
        default: false
    })
    isDeleted!: boolean;
    @OneToMany(() => Video, (video: any) => video.watchlist)
    videos!: any[];
}



