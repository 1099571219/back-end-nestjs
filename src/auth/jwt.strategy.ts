import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtContents } from "./jwt.contents";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromHeader('token'),
            secretOrKey:jwtContents.secret
        })
    }
    async validate(payload){
        return {username:payload.username,id:payload.sub}
    }
}