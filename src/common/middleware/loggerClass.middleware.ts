import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class loggerClass implements NestMiddleware {
    constructor(private UserService:UserService){}
    async use(req: any, res: any, next: (error?: any) => void) {
        console.log('中间件 loggerClass request ...');
        const users = await this.UserService.getAll()
        if(users){
            next()
        }
        console.log('中间件 loggerClass stack pop ...');
    }
} 