// import type { HttpContext } from '@adonisjs/core/http'

import Contact from '#models/contact'
import { HttpContext } from '@adonisjs/core/http'

export default class ContactsController {
  // Ajouter une demande de contact
  public async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'email', 'message'])
    const contact = await Contact.create(data)
    return response.created(contact)
  }

  // Voir toutes les demandes de contact (admin)
  public async index({ response }: HttpContext) {
    const contacts = await Contact.all()
    return response.json(contacts)
  }

  // Supprimer une demande de contact
  public async destroy({ params, response }: HttpContext) {
    const contact = await Contact.findOrFail(params.id)
    await contact.delete()
    return response.noContent()
  }
}
