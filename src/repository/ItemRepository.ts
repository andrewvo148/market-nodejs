import { EntityRepository, Repository, Transaction } from "typeorm";
import { Item } from "../entity/Item";


@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {

    async createOrUpdate(item: Item) {
        return super.save(item);
    }

}