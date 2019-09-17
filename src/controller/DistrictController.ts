import {NextFunction, Request, Response} from "express";
import { validate } from "class-validator";
import { getCustomRepository } from "typeorm";
import { DistrictRepository } from "../repository/DistrictRepository";
import { District } from "../entity/District";
import { City } from "../entity/City";



export class DistrictController {
    private districtRepo = getCustomRepository(DistrictRepository);

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            let district = new District();
            district.name = request.body.name;
            if (request.body.cityId) {
                let city = new City();
                city.id = request.body.cityId;
                district.city = city;
            }
            const errors = await validate(district);
            if (errors.length > 0) {
                response.status(400).json(errors);
                return;
            }
            await this.districtRepo.createOrUpdate(district);
            return response.status(200).json({code: "SUCCESS", district: district});
        } catch (e) {
            response.status(500).json({status: 500, message: e.message});
        }
    }

   
}       