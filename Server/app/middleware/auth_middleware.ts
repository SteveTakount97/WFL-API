import { HttpContext } from '@adonisjs/http-server/build/index.js'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'


/**
 * Auth middleware is used to authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
 

  redirectTo = '/signup'

  public async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    try {
      const guards = options.guards || ['api']
      //Vérifie si l'utilisateur est authentifié
      await ctx.auth.authenticateUsing(guards, { loginRoute: this.redirectTo })
      console.log('🔑 Received token:', ctx.request.header('Authorization'))


      //Si l'utilisateur est authentifié, passe à la suite
      await next()
    } catch (error) {

      //Si échec → réponse 401 Unauthorized
      ctx.response.status(401).send({
        error: 'Unauthorized',
        message: error.message,
      })
    }
  }
}
