import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id: number;

    @MaxLength(120)
    @IsNotEmpty()
    @Column({
        length: 100
    })
    name: String;

    constructor (id?: number) {
        this.id = id;
    }
}
