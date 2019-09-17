import { CategoryRepository } from "../repository/CategoryRepository";
import {NextFunction, Request, Response} from "express";
import { Category } from "../entity/Category";
import { validate } from "class-validator";
import { getCustomRepository } from "typeorm";

export class CategoryController {
    
    private categoryRepo = getCustomRepository(CategoryRepository);

    async getTrees(request: Request, response: Response, next: NextFunction) {
        try {
            let trees = await this.categoryRepo.findTrees();
            response.json(trees);
        } catch (e) {
            response.status(500).json({status: 500, message: e.message});
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            let category = new Category();
            category.name = request.body.name;
            if (request.body.parentId) {
                let parent = new Category();
                parent.id = request.body.parentId;
                category.parent = parent;
            }
            const errors = await validate(category);
            if (errors.length > 0) {
                response.status(400).json(errors);
                return;
            }
            category = await this.categoryRepo.createOrUpdate(category);
            return response.status(200).json(category);
        } catch (e) {
            response.status(500).json({status: 500, message: e.message});
        }
    }

   
}       