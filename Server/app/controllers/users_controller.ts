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
   *     security:
 *       - Bearer: []
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
  public async index({ auth, response }: HttpContext) {
    try {
      // Authentification automatique avec le token envoyé dans le header
      const user = await auth.use('api').authenticate()

      console.log('Utilisateur authentifié :', user)

      // Si besoin, retourne la liste des utilisateurs ou les détails de l'utilisateur
      const users = await this.userService.getAllUsers()
      return response.ok(users)
    } catch (error) {
      console.error('Erreur d’authentification :', error)
      return response.unauthorized({ message: 'Unauthorized' })
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
  public async show({ params, response }: HttpContext) {
    try {
      const user = await this.userService.getUserById(parseInt(params.id))
      return response.json(user)
    } catch (error) {
      return response.notFound({ message: 'Utilisateur non trouvé', error })
    }
  }

  /**
   * @swagger
  /**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     summary: Met à jour un utilisateur
 *     tags:
 *       - Utilisateurs
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       400:
 *         description: Erreur lors de la mise à jour
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
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags:
 *       - Utilisateurs
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
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
