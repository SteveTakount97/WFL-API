// import type { HttpContext } from '@adonisjs/core/http'

import Message from '#models/message'
import { HttpContext } from '@adonisjs/core/http'

export default class MessagesController {
  // Envoyer un message
  public async store({ request, response }: HttpContext) {
    const data = request.only(['sender_id', 'receiver_id', 'content'])
    const message = await Message.create(data)
    return response.created(message)
  }

  // Voir les messages d'un utilisateur
  public async index({ params, response }: HttpContext) {
    const messages = await Message.query().where('receiver_id', params.userId)
    return response.json(messages)
  }

  public async destroy({ params, response }: HttpContext) {
    const message = await Message.findOrFail(params.id)
    await message.delete()
    return response.noContent()
  }

  public async show({ params, response }: HttpContext) {
    const message = await Message.findOrFail(params.id)
    return response.json(message)
  }
}
