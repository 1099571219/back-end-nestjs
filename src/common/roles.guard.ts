import { UserService } from 'src/user/user.service'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
      console.log('执行守卫');
    const roles = this.reflector.get('roles', context.getHandler())
    if (!roles) return true
    
    const request = context.switchToHttp().getRequest()
    const user = request.user

    return this.matchRoles(roles,user)
  }
  private matchRoles(roles:string[],user:string){
    if(roles.indexOf(user)===-1){
        return true
    }
    return true
  }
}
