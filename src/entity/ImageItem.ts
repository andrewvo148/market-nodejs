import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Item } from "./Item";


@Entity()
export class ImageItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    width: number;

    @Column()
    height: number;

    @Column()
    url: string;

    @Column()
    digest: string;

    @Column()
    thumbUrl: string;

    @ManyToOne(type => Item)
    item: Item;

}
