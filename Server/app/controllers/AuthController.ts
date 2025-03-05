import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/AuthService'


export default class AuthController {
  /**
   * @description Permet de s'inscrire depuis le site web 
   * @returns user
   */
  public async register({ request, response, sentry }: HttpContext): Promise<void> {
    try {
      const user = await AuthService.registerUser(request.only(['email', 'password', 'full_name', 'username', 'role']))
      return response.created({ user })
    } catch (e) {
      sentry.captureException(e)
      return response.badRequest({ message: e.message })
    }
  }

  /**
   * @returns access_tokens
   */
  public async login({ request, response, sentry }: HttpContext): Promise<void> {
    try {
      const { email, password } = request.only(['email', 'password'])
      const { user, token } = await AuthService.authenticateUser(email, password)

      sentry.setUser({ email: user.email, id: user.id, username: user.firstName as string })
      return response.ok({ token, user })
    } catch (e) {
      sentry.captureException(e)
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  /**
   * @description Permet de se déconnecter
   * @returns message
   */
  public async logout({ auth, response, sentry }: HttpContext): Promise<void> {
    try {
      const message = await AuthService.logoutUser(auth)
      sentry.setUser(null)
      return response.ok({ message })
    } catch (e) {
      sentry.captureException(e)
      return response.internalServerError({ message: e.message })
    }
  }
}
