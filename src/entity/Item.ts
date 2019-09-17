import { Entity, PrimaryGeneratedColumn, Column, Transaction, Tree, TreeChildren, TreeParent, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./Category";
import { Location } from "./Location";
import { ImageItem } from "./ImageItem";
import { City } from "./City";
import { District } from "./District";
import { Ward } from "./Ward";
import { IsNumber, IsJSON } from "class-validator";

export enum Type {
   sell = "sell",
   buy =  "buy"
}
export enum State {
    used = "used",
    new = "new",
}
@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Category, { nullable: false })
    category: Category;

    @IsNumber()
    @Column({
        type: 'numeric',
        precision: 13,
        scale: 3
    })
    price: number;

    @Column()
    title: string;


    @Column({
        type: 'text'
    })
    description: string;


    @Column({
        type: "enum",
        enum: Type
    })
    type: Type;


    @Column({
        type: 'enum',
        enum: State
    })
    state: State


    @ManyToOne(type => City, { nullable: false})
    city: City;

    @ManyToOne(type => District, { nullable: false})
    district: District;

    @ManyToOne(type => Ward, { nullable: false})
    ward: Ward;

    @Column({
        type: 'text',
        nullable: true
    })
    delivery: string;

    @OneToMany(type => ImageItem, imageItem => imageItem.item, {persistence: false})
    images: ImageItem[];

    @IsJSON()
    @Column()
    attributes: string = '{}';

    constructor(id?: number) {
        this.id = id;
    }
}
