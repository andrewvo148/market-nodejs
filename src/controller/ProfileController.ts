import {NextFunction, Request, Response} from "express";
import { validate } from "class-validator";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
import { SecurityUtils } from "../util/SecurityUtils";
export class ProfileController {

    private userRepo = getCustomRepository(UserRepository)

    async get(request: Request, response: Response, next: NextFunction) {
        try {
            let u = SecurityUtils.getCurrentUser(request);
            response.json(u);
        } catch (e) {
            response.status(500).json({status: 'error', message: e.message})
        }
       
    }
    async update(request: Request, response: Response, next: NextFunction) {
        let self = this;
        try {
            let user = SecurityUtils.getCurrentUser(request);
            user.fullname = request.body.fullname;
            user.address = request.body.address;
            user.gender = request.body.gender;
            user.birthday = request.body.birthday;

            const errors = await validate(user)
            if (errors.length > 0) {
                response.status(400).json({code: 'error', message: errors})
                return
            }
            await self.userRepo.createOrUpdate(user)
            return response.status(200).json(user)
        } catch (e) {
            response.status(500).json({status: 'error', message: e.message})
        }
    }

   
}       