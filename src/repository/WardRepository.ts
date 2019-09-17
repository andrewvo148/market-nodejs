import { EntityRepository, Repository } from "typeorm";
import { Ward } from "../entity/Ward";


@EntityRepository(Ward)
export class WardRepository extends Repository<Ward> {

    async createOrUpdate(ward: Ward) {
        return super.save(ward);
    }

}