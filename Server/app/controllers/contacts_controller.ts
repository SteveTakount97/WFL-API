import type { HttpContext } from '@adonisjs/core/http'
import Contact from '#models/contact'
import { schema, rules } from '@adonisjs/validator'

export default class ContactsController {
  /**
   * Ajouter une demande de contact
   */
  public async store({ request, response }: HttpContext) {
    try {
      // Validation des données entrantes
      const contactSchema = schema.create({
        name: schema.string({ trim: true }),
        email: schema.string({}, [rules.email()]),
        message: schema.string(),
      })

      const payload = await request.validate({ schema: contactSchema })

      // Création du contact
      const contact = await Contact.create(payload)

      return response.created({
        message: 'Demande de contact créée avec succès',
        contact,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la création du contact',
        error: error.messages || error.message,
      })
    }
  }

  /**
   * Voir toutes les demandes de contact (avec pagination)
   */
  public async index({ request, response }: HttpContext) {
    try {
      // Récupération avec pagination (10 contacts par page)
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const contacts = await Contact.query().paginate(page, limit)

      return response.json({
        message: 'Liste des contacts récupérée avec succès',
        contacts,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Erreur lors de la récupération des contacts',
        error: error.message,
      })
    }
  }

  /**
   * Met à jour une demande de contact
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      // Recherche du contact
      const contact = await Contact.findOrFail(params.id)

      // Définition du schéma de validation
      const contactSchema = schema.create({
        name: schema.string.optional({ trim: true }),
        email: schema.string.optional({}, [rules.email()]),
        message: schema.string.optional(),
      })

      // Validation des données
      const payload = await request.validate({ schema: contactSchema })

      // Mise à jour du contact
      contact.merge(payload)
      await contact.save()

      return response.json({
        message: 'Demande de contact mise à jour avec succès',
        contact,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Erreur lors de la mise à jour du contact',
        error: error.messages || error.message,
      })
    }
  }

  /**
   * Supprimer une demande de contact
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      // Récupération et suppression du contact
      const contact = await Contact.findOrFail(params.id)
      await contact.delete()

      return response.noContent()
    } catch (error) {
      return response.status(404).json({
        message: 'Le contact demandé est introuvable',
        error: error.message,
      })
    }
  }
}
