import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import jwt_decode from "jwt-decode";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext) {
        const activate = (await super.canActivate(context)) as boolean;

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        await super.logIn(request);
        return activate;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
