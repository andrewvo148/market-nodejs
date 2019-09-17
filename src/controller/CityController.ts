import {NextFunction, Request, Response} from "express";
import { validate } from "class-validator";
import { getCustomRepository } from "typeorm";
import { CityRepository } from "../repository/CityRepository";
import { City } from "../entity/City";



export class CityController {
    private CityRepo = getCustomRepository(CityRepository);

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            let city = new City();
            city.name = request.body.name;
        
            const errors = await validate(city);
            if (errors.length > 0) {
                response.status(400).json(errors);
                return;
            }
            await this.CityRepo.createOrUpdate(city);
            return response.status(200).json(city);
        } catch (e) {
            response.status(500).json({status: 500, message: e.message});
        }
    }

   
}       