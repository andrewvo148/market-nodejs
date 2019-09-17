import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsNotEmpty, MaxLength } from "class-validator";
import { City } from "./City";


@Entity()
export class District {

    @PrimaryGeneratedColumn()
    id: number;


    @MaxLength(100)
    @IsNotEmpty()
    @Column({
        length: 100
    })
    name: String;

    @ManyToOne(type => City)
    city: City;

    constructor (id?: number) {
        this.id = id;
    }

}
