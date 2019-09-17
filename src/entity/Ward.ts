import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty, MaxLength } from "class-validator";
import { type } from "os";
import { District } from "./District";


@Entity()
export class Ward {

    @PrimaryGeneratedColumn()
    id: number;

    @MaxLength(100)
    @IsNotEmpty()
    @Column({
        length: 100
    })
    name: String;

    @ManyToOne(type => District)
    district: District;

    constructor (id?: number) {
        this.id = id;
    }
}
