import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { ROLES_KEY } from './roles.decorator'
import { Role } from './role.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requireRoles) return true

    const { user } = context.switchToHttp().getRequest()

    const roles = requireRoles.some((...role: Role[]) =>
      user.Roles?.includes(role),
    )
    if (roles) {
      return true
    } else {
      throw new ForbiddenException('权限不足')
    }
  }
}
