import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { getCustomRepository } from "typeorm";
import { City } from "../entity/City";
import { ItemRepository } from "../repository/ItemRepository";
import { Item } from "../entity/Item";
import { District } from "../entity/District";
import { Ward } from "../entity/Ward";
import { ItemService } from "../service/ItemService";
import { Category } from "../entity/Category";

export class ItemController {
    private itemRepo = getCustomRepository(ItemRepository);
    private itemService = new ItemService();
    async save(request: Request, response: Response, next: NextFunction) {
        try {
            let item            = new Item();
            item.title          = request.body.title;
            item.city           = new City(request.body.cityId);
            item.district       = new District(request.body.districtId);
            item.ward           = new Ward(request.body.wardId);
            item.type           = request.body.type;
            item.state          = request.body.state;
            item.description    = request.body.description;
            item.price          = request.body.price;
            item.category       = new Category(request.body.categoryId);
            item.delivery       = request.body.delivery;
            item.attributes     = request.body.attributes;
            // populate 
            item.images = request.body.images;
            const errors        = await validate(item);
            if (errors.length > 0) {
                response.status(400).json(errors);
                return;
            }
            
            if (request.body.id) {
                item.id = request.body.id;
            }
            item = await this.itemService.save(item);
            return response.status(200).json(item);
        } catch (e) {
            response.status(500).json({status: 500, message: e.message});
        }
    }

    async search(request: Request, response: Response, next: NextFunction) {
        try {
            let query = request.query.q;
            this.itemService.search(query);
            response.json("sjs");
        } catch (e) {
            response.status(500).json({status: 500, message: e.message});
        }
    }
}       