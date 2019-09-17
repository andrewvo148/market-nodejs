import {NextFunction, Request, Response} from "express";
import * as multer from "multer";
import { extname } from "path";
import { createHash } from "crypto";
import { readFile } from "fs";
import { ImageDto } from "../dto/ImageDto";
import * as sharp from "sharp";

export class ImageController {
    private storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "public/uploads/")
        },
        filename: function (req, file, callback) {
            callback(null, Date.now() + extname(file.originalname));
        },
    });
    async upload(request: Request, response: Response, next: NextFunction) {
        
        let up = multer({ 
            storage : this.storage,
            fileFilter: function(req, file, callback) {
                let ext = extname(file.originalname);
                if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext != '.jpeg') {
                    return callback(new Error("Type file not allowed"), false);
                }
                callback(null, true)
            }
        
        }).single('image');
        up(request, response, function(err) {
            if (err) {
                return response.status(400).json({code: "INVALID", message: err.message})
            }
            //response.json(request.file);
            const hash = createHash('sha256');
            let imageDto = new ImageDto();
       
             readFile(request.file.path, function(err, data) {
                if (err) {
                    response.status(500).json({code: "ERROR", message: err.message});
                    return;
                }
                let digest = hash.update('sha256').update(data).digest('base64');
                imageDto.image_digest = digest;
                imageDto.image_id = request.file.filename;
                imageDto.image_url = "http://localhost:3000/" + request.file.path;
                
                sharp(request.file.path)
                .toBuffer(function (err, buf, info) {
                    if (err) {
                        return;
                    }
                    imageDto.image_width = info.width;
                    imageDto.image_height = info.height;

                    sharp(request.file.path)
                    .resize(400)
                    .toFile("public/uploads/thumbs/" + request.file.filename, 
                        (err, info2) => {
                            if (err) {
                                response.status(500).json({code: "ERROR", message: err.message});
                            }
                            imageDto.thumb_url = "http://localhost:3000/public/uploads/thumbs/" + request.file.filename;
                            response.json(imageDto);
                            return;
                        });
                });
            });    
        });
        
    }
   
}       