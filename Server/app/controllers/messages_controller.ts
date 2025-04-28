import type { HttpContext } from '@adonisjs/core/http'
import Message from '#models/message'
import { schema, rules } from '@adonisjs/validator'

export default class MessagesController {
  /**
   * @swagger
   * /api/messages:
   *   post:
   *     summary: Envoyer un message
   *     tags:
   *       - Messages
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               senderId:
   *                 type: integer
   *               receiverId:
   *                 type: integer
   *               content:
   *                 type: string
   *                 description: Le contenu du message
   *                 maxLength: 1000
   *                 minLength: 1
   *     responses:
   *       201:
   *         description: Message envoyé avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                     senderId:
   *                       type: integer
   *                     receiverId:
   *                       type: integer
   *                     content:
   *                       type: string
   *       400:
   *         description: Erreur lors de l'envoi du message
   */
  public async store({ request, response }: HttpContext) {
    try {
      // Validation des données entrantes
      const messageSchema = schema.create({
        senderId: schema.number([ 
          rules.required(),
          rules.requiredIfExists('receiverId'),
        ]),
        receiverId: schema.number([ 
          rules.required(),
          rules.requiredIfExists('senderId'),
        ]),
        content: schema.string({ trim: true }, [
          rules.required(),
          rules.minLength(1), 
          rules.maxLength(1000), 
        ]),
      })

      const payload = await request.validate({ schema: messageSchema })

      // Création du message
      const message = await Message.create(payload)

      return response.created({
        message: 'Message envoyé avec succès',
        data: message,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de l\'envoi du message',
        error: error.messages || error.message,
      })
    }
  }

  /**
   * @swagger
   * /api/messages/{userId}:
   *   get:
   *     summary: Voir les messages reçus par un utilisateur (avec pagination)
   *     tags:
   *       - Messages
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: ID de l'utilisateur dont on souhaite voir les messages reçus
   *         schema:
   *           type: integer
   *       - in: query
   *         name: page
   *         required: false
   *         description: Page de résultats pour la pagination
   *         schema:
   *           type: integer
   *           default: 1
   *       - in: query
   *         name: limit
   *         required: false
   *         description: Nombre de messages par page
   *         schema:
   *           type: integer
   *           default: 10
   *     responses:
   *       200:
   *         description: Messages récupérés avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 data:
   *                   type: object
   *                   properties:
   *                     total:
   *                       type: integer
   *                     per_page:
   *                       type: integer
   *                     current_page:
   *                       type: integer
   *                     last_page:
   *                       type: integer
   *                     data:
   *                       type: array
   *                       items:
   *                         type: object
   *                         properties:
   *                           id:
   *                             type: integer
   *                           senderId:
   *                             type: integer
   *                           receiverId:
   *                             type: integer
   *                           content:
   *                             type: string
   *       500:
   *         description: Erreur lors de la récupération des messages
   */
  public async index({ request, params, response }: HttpContext) {
    try {
      // Récupération avec pagination (10 messages par page)
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const messages = await Message.query()
        .where('receiverId', params.userId)
        .preload('sender') // Charge les infos de l'expéditeur
        .paginate(page, limit)

      return response.json({
        message: 'Messages récupérés avec succès',
        data: messages,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erreur lors de la récupération des messages',
        error: error.message,
      })
    }
  }

  /**
   * @swagger
   * /api/messages/{id}:
   *   get:
   *     summary: Voir un message spécifique
   *     tags:
   *       - Messages
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID du message à consulter
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Message trouvé
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 data:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: integer
   *                     senderId:
   *                       type: integer
   *                     receiverId:
   *                       type: integer
   *                     content:
   *                       type: string
   *       404:
   *         description: Message introuvable
   */
  public async show({ params, response }: HttpContext) {
    try {
      const message = await Message.query()
        .where('id', params.id)
        .preload('sender')
        .preload('receiver')
        .firstOrFail()

      return response.json({
        message: 'Message trouvé',
        data: message,
      })
    } catch (error) {
      return response.status(404).json({
        message: 'Message introuvable',
        error: error.message,
      })
    }
  }

  /**
   * @swagger
   * /api/messages/{id}:
   *   delete:
   *     summary: Supprimer un message
   *     tags:
   *       - Messages
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID du message à supprimer
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Message supprimé avec succès
   *       404:
   *         description: Message introuvable
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      const message = await Message.findOrFail(params.id)
      await message.delete()

      return response.noContent()
    } catch (error) {
      return response.status(404).json({
        message: 'Message introuvable',
        error: error.message,
      })
    }
  }
}
