import { EntityRepository, Repository } from "typeorm";
import { District } from "../entity/District";


@EntityRepository(District)
export class DistrictRepository extends Repository<District> {

    async createOrUpdate(district: District) {
        return super.save(district);
    }

}