import { ManyToOne, Column } from "typeorm";
import { City } from "./City";
import { District } from "./District";
import { Ward } from "./Ward";

export class Location {

  
    @ManyToOne(type => City, { nullable: false})
    city: City;

    @ManyToOne(type => District, { nullable: false})
    district: District;

    @ManyToOne(type => Ward, { nullable: false})
    ward: Ward;

    
}