import { HttpContext } from '@adonisjs/http-server/build/index.js'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

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
      
      // Extraire le token du header Authorization
      const authorizationHeader = ctx.request.header('Authorization')
      console.log('🔎 Token reçu dans le header:', authorizationHeader)
      if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        const token = authorizationHeader.split(' ')[1]
        ctx.request.updateBody({ token }) // Mettre à jour le body avec le token
      }

      // Vérification du token avec le guard `api`
      await ctx.auth.authenticateUsing(guards)
      console.log('🔑 Token reçu et valide')

      //  Passe à la suite si authentifié
      await next()
    } catch (error) {
      console.error('❌ Authentification échouée :', error.message)
      return ctx.response.unauthorized({ message: 'Token invalide ou expiré' })
    }
  }
}
