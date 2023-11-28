import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SignedInGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authHeader = context.switchToHttp().getRequest<Request>().headers[
      'authorization'
    ];

    return authHeader ? true : false;
  }
}
