import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Item } from "./Item";


// @Entity()
// export class Attribute {

//     @PrimaryGeneratedColumn()
//     id: number;

//     @ManyToOne(type => Item)
//     item: Item;
    
//     @MaxLength(20)
//     @IsNotEmpty()
//     @Column({
//         length: 20
//     })
//     key: String;

//     @MaxLength(100)
//     @IsNotEmpty()
//     @Column({
//         length: 100
//     })
//     value: String;

//     constructor (id?: number) {
//         this.id = id;
//     }
// }
