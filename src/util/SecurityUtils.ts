import { Request, Response } from "express";
import { User } from "../entity/User";

export class SecurityUtils {

    static getCurrentUser(req: Request): User {
       return req.user && req.user.data;
    }
}

// decorator
export function Secured(roles: string[]) {
    return (target: Object, propertyName: string, descriptor:
        PropertyDescriptor) => {
            let originalMethod = descriptor.value;

            descriptor.value = function(...args: any[]) {
                console.log((<Request>args[0]).user);
                if ((<Request>args[0]).user && (<Request>args[0]).user.data && !roles.includes((<Request>args[0]).user.data.role)) {
                    return (<Response>args[1]).status(403).json("Access denined!");
                }
                return originalMethod.apply(this, args);
            }
        };
    }