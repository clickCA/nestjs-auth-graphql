import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/// Refresh token guard
@Injectable()
export class RtGuard extends AuthGuard('rt-jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = this.getRequest(context);
    const refreshToken =
      req.body?.variables?.refreshToken ||
      req.headers?.refreshtoken ||
      (req.body?.operationName === 'RefreshTokens' &&
        req.body?.query?.match(/refreshToken:\s*"([^"]+)"/)?.[1]);
    if (!refreshToken) throw new Error('Refresh token not found');
    return true;
  }
}
