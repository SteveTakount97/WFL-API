import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/UserService'

export default class UsersController {
  private userService: UserService

  // 🔹 Initialisation du UserService via le constructeur
  constructor() {
    this.userService = new UserService()
  }

  /**
   * Récupère tous les utilisateurs
   */
  public async index({ response }: HttpContext) {
    try {
      const users = await this.userService.getAllUsers()
      return response.json(users)
    } catch (error) {
      return response.internalServerError({ message: 'Erreur lors de la récupération des utilisateurs', error })
    }
  }

  /**
   * Récupère un utilisateur spécifique
   */
  public async show({ params, response }: HttpContext) {
    try {
      const user = await this.userService.getUserById(parseInt(params.id))
      return response.json(user)
    } catch (error) {
      return response.notFound({ message: 'Utilisateur non trouvé', error })
    }
  }

  /**
   * Met à jour un utilisateur
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      const user = await this.userService.updateUser(parseInt(params.id), request)
      return response.json(user)
    } catch (error) {
      return response.badRequest({ message: 'Erreur lors de la mise à jour', error })
    }
  }

  /**
   * Supprime un utilisateur
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      await this.userService.deleteUser(parseInt(params.id))
      return response.noContent()
    } catch (error) {
      return response.notFound({ message: 'Utilisateur non trouvé', error })
    }
  }
}
