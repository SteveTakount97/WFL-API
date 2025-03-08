import type { HttpContext } from '@adonisjs/core/http'
import UserService from '#services/UserService'

export default class UsersController {
  private userService: UserService

  // 🔹 Initialisation du UserService via le constructeur
  constructor() {
    this.userService = new UserService()
  }
  /**
   * @swagger
   * /api/admin/users:
   *   get:
   *     summary: Récupère tous les utilisateurs
   *     tags:
   *       - Utilisateurs
   *     responses:
   *       200:
   *         description: Liste des utilisateurs
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   username:
   *                     type: string
   *                   email:
   *                     type: string
   *                   created_at:
   *                     type: string
   *                     format: date-time
   *       500:
   *         description: Erreur serveur
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
   * @swagger
   * /api/admin/users/{id}:
   *   get:
   *     summary: Récupère un utilisateur spécifique
   *     tags:
   *       - Utilisateurs
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID de l'utilisateur à récupérer
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Détails de l'utilisateur
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 username:
   *                   type: string
   *                 email:
   *                   type: string
   *                 created_at:
   *                   type: string
   *                   format: date-time
   *       404:
   *         description: Utilisateur non trouvé
   */

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
