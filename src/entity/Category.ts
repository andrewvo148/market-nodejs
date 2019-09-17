import { Entity, PrimaryGeneratedColumn, Column, Transaction, Tree, TreeChildren, TreeParent } from "typeorm";
import { IsNotEmpty, MaxLength } from "class-validator";


@Entity()
@Tree("closure-table")
export class Category {

    @PrimaryGeneratedColumn()
    id: number;


    @MaxLength(120)
    @IsNotEmpty()
    @Column({
        length: 120
    })
    name: String;

    @TreeChildren()
    children: Category[]

    @TreeParent()
    parent: Category;

    constructor(id?: number) {
        this.id = id;
    }
}
