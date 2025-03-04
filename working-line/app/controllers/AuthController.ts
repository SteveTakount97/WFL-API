

/*mport { HttpContext } from '@adonisjs/core/http'
/*import AuthService from '#services/AuthService' 

export default class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  public async register({ request, response }: HttpContext) {
    const { email, password, name, role } = request.only(['email', 'password', 'name', 'role'])

    try {
      // Enregistrer l'utilisateur via le service
      const user = await this.authService.registerUser({ email, password, name, role })
      return response.created({ user })
    } catch (error) {
      return response.status(500).json({ message: 'Error during registration', error: error.message })
    }
  }
} */
