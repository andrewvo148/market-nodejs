import { EntityRepository, Repository, TreeRepository } from "typeorm";
import { Category } from "../entity/Category";


@EntityRepository(Category)
export class CategoryRepository extends TreeRepository<Category> {

    async createOrUpdate(category: Category) {
        return super.save(category);
    }

}