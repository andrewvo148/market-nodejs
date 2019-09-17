import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createOrUpdate(user: User) {
        return super.save(user);
    }
    async findByPhone(phone: string) {
        return this.findOne({phone});
    }
}