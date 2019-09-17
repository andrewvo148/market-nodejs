import {NextFunction, Request, Response} from "express";
import { validate } from "class-validator";
import { getCustomRepository } from "typeorm";
import { WardRepository } from "../repository/WardRepository";
import { Ward } from "../entity/Ward";
import { District } from "../entity/District";

export class WardController {
    private wardRepo = getCustomRepository(WardRepository);

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            let ward = new Ward();
            ward.name = request.body.name;
            if (request.body.districtId) {
                let district = new District();
                district.id = request.body.districtId;
                ward.district = district;
            }
            const errors = await validate(ward);
            if (errors.length > 0) {
                response.status(400).json(errors);
                return;
            }
            await this.wardRepo.createOrUpdate(ward);
            return response.status(200).json(ward);
        } catch (e) {
            response.status(500).json({status: 500, message: e.message});
        }
    }

   
}       