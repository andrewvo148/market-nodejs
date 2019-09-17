import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import * as jwt  from "express-jwt";
import * as helmet  from "helmet";
import * as winston from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.json(),
    ),
    transports: [
        //
        // - Write to all logs with level `info` and below to `logs/combined.log`
        // - Write all logs error (and below) to `logs/error.log`.
        //
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.splat(),
            winston.format.json(),
        ),
    }));
}
createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(helmet());
    app.use(bodyParser.json());

    // authenticate HTTP requests using JWT tokens
    app.use('/api/priv/**',jwt({
        secret: 'GcsVmCWMefaNKdFtKLxmnckpfDU=',
       // audience: 'http://localhost',
       // issuer: 'http://localhost:3000',
        credentialsRequired: true,
        getToken: function fromHeaderOrQueryString (req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        }
    }));

    // handle unauthorized access 
    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send('invalid token...');
        }
    });

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            return (new (route.controller as any))[route.action as any ](req, res, next);            
        });

    });

    // setup express app here
    // ...

    // start express server
    app.listen(3000);



    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
