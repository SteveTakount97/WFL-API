import { HttpContext } from '@adonisjs/core/http';
import AuthService from '#services/AuthService';
import * as Sentry from '@sentry/node'; 

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Les informations de l'utilisateur à enregistrer
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
 *       201:
 *         description: L'utilisateur a été enregistré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                     full_name:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Erreur lors de l'enregistrement de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
export default class AuthController {
  /**
   * @description Permet de s'inscrire depuis le site web
   * @returns user
   */
  public async register({ request, response }: HttpContext): Promise<void> {
    try {
      const user = await AuthService.registerUser(request.only(['email', 'password', 'full_name', 'username', 'role']));
      return response.created({ user });
    } catch (e) {
      // Si Sentry est bien configuré dans le projet
      Sentry.captureException(e);
      return response.badRequest({ message: e.message });
    }
  }

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Authentifier un utilisateur
   *     tags:
   *       - Auth
   *     requestBody:
   *       description: Les informations de connexion de l'utilisateur
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: L'utilisateur a été authentifié avec succès et un jeton d'accès a été généré
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                 user:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                     username:
   *                       type: string
   *                     email:
   *                       type: string
   *                     full_name:
   *                       type: string
   *                     role:
   *                       type: string
   *       401:
   *         description: Identifiants invalides
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  public async login({ request, auth, response }: HttpContext): Promise<void> {
    const { email, password } = request.only(['email', 'password'])

    try {
      const { user, token } = await AuthService.authenticateUser({ email, password })
      // Authentification réussie, on génère une session
      await auth.use('session').login(user)
      return response.ok({ token, user }) // ✅ Réponse 200
      
    } catch (error) {
      console.error('Login error:', error.message)
      return response.unauthorized({ message: 'Invalid credentials' }) //✅ Réponse 401
    }
  }

  /**
   * @swagger
   * /auth/logout:
   *   post:
   *     summary: Déconnecter un utilisateur
   *     tags:
   *       - Auth
   *     responses:
   *       200:
   *         description: L'utilisateur a été déconnecté avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *       500:
   *         description: Erreur interne du serveur
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */
  public async logout({ auth, response }: HttpContext): Promise<void> {
    try {
      
      const message = await AuthService.logoutUser(auth);
      await auth.use('session').logout()
      return response.ok({ message });
    } catch (e) {
      Sentry.captureException(e);
      return response.internalServerError({ message: e.message });
    }
  }
    /**
   * @swagger
   * /auth/me:
   *   get:
   *     summary: Récupérer les informations de l'utilisateur authentifié
   *     tags:
   *       - Auth
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Succès - Détails de l'utilisateur récupérés avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   example: 1
   *                 email:
   *                   type: string
   *                   example: "user@example.com"
   *                 username:
   *                   type: string
   *                   example: "Styve_Navaro"
   *                 role:
   *                   type: string
   *                   example: "admin"
   *       401:
   *         description: Token invalide ou expiré
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Token invalide ou expiré"
   *       500:
   *         description: Erreur interne du serveur
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Erreur interne du serveur"
   */
  public async me({ auth, response }: HttpContext) {
    try {
      const user = await AuthService.getUser(auth)
      return response.ok(user)
    } catch (error) {
      console.error('❌ Erreur lors de la récupération de l’utilisateur :', error)
      return response.unauthorized({ message: 'Token invalide ou expiré' })
    }
  }
}
