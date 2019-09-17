import {NextFunction, Request, Response} from "express";
import { validate } from "class-validator";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/UserRepository";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export class AuthController {

    private userRepo = getCustomRepository(UserRepository);

    async login(request: Request, response: Response, next: NextFunction) {
        let self = this;
        try {
            let user = new User();
            user.phone = request.body.phone;
            user.password = request.body.password;
            const errors = await validate(user);
            if (errors.length > 0) {
                response.status(400).json(errors);
                return;
            }
            let u = await this.userRepo.findByPhone(user.phone);
            if (u == null) {
                response.status(400).json({code: 'error', message: 'The phone number not right'});
                return;
            }
            const match = await bcrypt.compare(user.password, u.passwordHash);
            if (match) { //login
                delete u.passwordHash
                let token = sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                    data: u
                }, "GcsVmCWMefaNKdFtKLxmnckpfDU=" );
                response.json({code: 'successs', access_token: token});
            } else {
                response.status(400).json({code: 'error', message: 'The password not right'});
                return;
            } 
        } catch (e) {
            response.status(500).json({status: 500, message: e.message});
        }
    }

   async logout(request: Request, response: Response, next: NextFunction) {
        let self = this;
        try {
        } catch (e) {
            response.status(500).json({status: 500, message: e.message});
        }
    }
}       