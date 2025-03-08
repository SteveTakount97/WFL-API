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
  public async login({ request, response }: HttpContext): Promise<void> {
    try {
      const { email, password } = request.only(['email', 'password']);
      const { user, token } = await AuthService.authenticateUser(email, password);
      return response.ok({ token, user });
    } catch (e) {
      Sentry.captureException(e);
      return response.unauthorized({ message: 'Invalid credentials' });
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
      return response.ok({ message });
    } catch (e) {
      Sentry.captureException(e);
      return response.internalServerError({ message: e.message });
    }
  }
}
