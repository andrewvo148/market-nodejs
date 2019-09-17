import {NextFunction, Request, Response} from "express";
import { validate } from "class-validator";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
export class AccountController {

    private userRepo = getCustomRepository(UserRepository)

    async register(request: Request, response: Response, next: NextFunction) {
        let self = this;
        try {
            let user = new User()
            user.phone = request.body.phone
            user.password = request.body.password
            const errors = await validate(user)
            if (errors.length > 0) {
                response.status(400).json({code: 'error', message: errors})
                return
            }
            let u = await this.userRepo.findByPhone(user.phone);
            if (u != null) {
                response.status(400).json({code: 'error', message: 'The phone number was existed'})
                return
            }
            let hash = await bcrypt.hash(user.password, 15)
            user.passwordHash = hash
            delete user.password;
            await self.userRepo.createOrUpdate(user)
            return response.status(200).json(user)
        } catch (e) {
            response.status(500).json({status: 'error', message: e.message})
        }
    }

   
}       