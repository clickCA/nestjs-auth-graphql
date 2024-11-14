import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/// AccessToken guard
@Injectable()
export class AtGuard extends AuthGuard('at-jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const req = this.getRequest(context);
    // super.logIn(req);
    console.log('req', req);
    const bearerToken = req?.headers?.authorization?.split(' ')[1];
    if (!bearerToken) {
      return false;
    }
    return true;
  }
}
