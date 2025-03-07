import { HttpContext } from '@adonisjs/core/http'

export default class AdminMiddleware {
  /**
   * Cette méthode vérifie que l'utilisateur est authentifié et qu'il a un rôle d'administrateur.
   */
  async handle(ctx: HttpContext, next: Function) {
    // Vérification que l'utilisateur est authentifié
    const user = ctx.auth.user
    if (!user) {
      return ctx.response.unauthorized('You must be logged in to access this resource')
    }

    // Vérification que l'utilisateur a le rôle "admin"
    if (user.role !== 'admin') {
      return ctx.response.forbidden('You do not have permission to access this resource')
    }

    // Si l'utilisateur est authentifié et a le bon rôle, on passe à la suite
    return next()
  }
}
