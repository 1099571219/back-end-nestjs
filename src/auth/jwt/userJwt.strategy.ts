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
        // const [user] =await this.UserService.findUser(payload.username)
        return {_id:payload.sub,userId:payload.userId,username:payload.username,role:payload.role,isAdmin:payload.isAdmin}
    }
}
export interface userInfo{
    _id:string,
    userId:number,
    username:string,
    role:string,
    isAdmin:boolean,
}