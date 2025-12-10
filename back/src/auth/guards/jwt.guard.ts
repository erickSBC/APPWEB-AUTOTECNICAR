import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'] || req.headers['Authorization'];
//    console.log('Authorization header recibido:', auth); 
    if (!auth) throw new UnauthorizedException('No token');
    const [type, token] = auth.split(' ');
    if (type !== 'Bearer' || !token) throw new UnauthorizedException('Invalid token');
    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET ?? 'changeme' });
      req.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
