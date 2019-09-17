import { EntityRepository, Repository } from "typeorm";
import { City } from "../entity/City";


@EntityRepository(City)
export class CityRepository extends Repository<City> {

    async createOrUpdate(city: City) {
        return super.save(city);
    }

}