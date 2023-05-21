import { UserService } from 'src/user/user.service';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";
import { Observable } from "rxjs";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'userJwt') {
    constructor(private UserService:UserService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:jwtConstants.user
        })
    }
    async validate(payload):Promise<userInfo>{
        const user =await this.UserService.findUser(payload.username)
        return {userId:user.id,role:user.role}
    }
    
}
export interface userInfo{
    userId:number,
    role:string
}