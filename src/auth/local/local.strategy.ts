import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly AuthService:AuthService){
        super()
    }
    async validate(username:string,password:string){
        
        const user = await this.AuthService.validateUser(username,password)

        if(!user){
            throw new UnauthorizedException('账号密码错误')
        }else{
            return user
        }
    }
}