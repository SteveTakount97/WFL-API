import type { HttpContext } from '@adonisjs/core/http'
import Message from '#models/message'
import { schema, rules } from '@adonisjs/validator'


export default class MessagesController {
  /**
   * Envoyer un message
   */
  public async store({ request, response }: HttpContext) {
    try {
      // Validation des données entrantes
      const messageSchema = schema.create({
        senderId: schema.number([
          rules.required(),
          rules.exists({ table: 'users', column: 'id' }),
        ]),
        receiverId: schema.number([
          rules.required(),
          rules.exists({ table: 'users', column: 'id' }),
        ]),
        content: schema.string({ trim: true }, [
          rules.required(),
          rules.minLength(1),  // Ajout d'une règle minLength pour éviter un contenu vide
          rules.maxLength(1000), // Limiter la longueur du message pour éviter les textes trop longs
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
   * Voir les messages reçus par un utilisateur (avec pagination)
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
   * Voir un message spécifique
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
   * Supprimer un message
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
