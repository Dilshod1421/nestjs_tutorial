import { JwtService } from '@nestjs/jwt/dist';
import {Injectable,ExecutionContext, CanActivate, UnauthorizedException, ForbiddenException} from '@nestjs/common'
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import {ROLES_KEY} from '../decorators/roles-auth.decorators'


@Injectable()
export class  RolesGuard implements CanActivate {
constructor(private readonly jwtService:JwtService, private readonly raflector: Reflector) {}

canActivate(
    context: ExecutionContext,
): boolean | Promise<boolean> | Observable<boolean>{

    const requiredRoles = this.raflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass]
    );
    if(!requiredRoles){
        return true
    }

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new UnauthorizedException({
            message: "Foydalanuvchi bor"
        }); 
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if(bearer !== 'Bearer' || !token){
        throw new UnauthorizedException({
            message: "Foydalanuvchi bor"
        });
    }

    let user: any;
    try {
        user = this.jwtService.verify(token)
        
        console.log(user); 
        
        
    } catch (error) {
        throw new UnauthorizedException({
            message: "Foydalanuvchi bor"
        });
    }
    const permittion = user.roles.some((role: any) => requiredRoles.includes(role.value))
    req.user = user
    if(!permittion) {
        throw new ForbiddenException({
            message: 'Sizga ruxsat etilmagan'
        })
    }
    return true
}

}