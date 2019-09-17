import { IsNotEmpty, MaxLength, IsEmail, MinLength, IsEmpty, ValidateIf } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum GenderType {
    famale = 'female',
    male = 'male',
    other = 'other'
}
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        nullable: true
    })
    fullname: String;

    @Column({
        nullable: true
    })
    address: string;

    @Column({
        type: 'enum',
        enum: GenderType,
        nullable: true
    })
    gender: GenderType;

    @Column({
        type: 'date',
        nullable: true
    })
    birthday: Date;

    @MaxLength(13)
    @Column({
        length: 13
    })
    phone: string;

    @ValidateIf(o => o.email == '')
    @IsEmail()
    @Column({
        length: 50,
        nullable: true
    })
    email: string;
    
    @MinLength(3)
    @MaxLength(20)
    password: string;

    @Column()
    passwordHash: string;

    verificationCode: string;

    constructor (id?: number) {
        this.id = id;
    }
}
