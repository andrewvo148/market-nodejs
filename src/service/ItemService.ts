import { Transaction, TransactionRepository, Repository } from "typeorm";
import { Item } from "../entity/Item";
import { ItemRepository } from "../repository/ItemRepository";
import { ImageItem } from "../entity/ImageItem";

import { Client, RequestParams } from "@elastic/elasticsearch";
const client = new Client({ node: 'http://localhost:9200' });

export class ItemService {
    @Transaction()
    async save(item: Item, @TransactionRepository() itemRepository?: ItemRepository,
     @TransactionRepository(ImageItem) imageItemRepository?: Repository<ImageItem>) {
         await itemRepository.createOrUpdate(item);
         await imageItemRepository.delete({item: item});
         item.images.map((img: ImageItem) => img.item = new Item(item.id));
         await imageItemRepository.save(item.images);


         // indexing ES
         const doc: RequestParams.Index = {
             index: 'market',
             body: {
                item_id: item.id,
                title: item.title,
                description: item.description,
                price: item.price

             }
         }
         await client.index(doc)
         return item;        
    }

    async search(queryStr: string) {
        const { body } = await client.search({
            index: 'market',
            body: {
                query: {
                    multi_match: {
                        query: queryStr,
                        fields: [ "title", "description" ]
                    }
                }
            }
        });
        console.log(body.hits.hits);
    }
}