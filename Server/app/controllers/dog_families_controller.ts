import type { HttpContext } from '@adonisjs/core/http'
import DogFamilyService from '#services/DogFamilyServices'

export default class DogFamilyController {
  /**
   * Liste toutes les familles de chiens
   */
  public async index({ response }: HttpContext) {
    const families = await DogFamilyService.getAllFamilies()
    return response.ok(families)
  }

  /**
   * Affiche une famille de chiens spécifique
   */
  public async show({ params, response }: HttpContext) {
    try {
      const family = await DogFamilyService.getFamilyById(params.id)
      return response.ok(family)
    } catch (error) {
      return response.notFound({ message: 'Famille non trouvée' })
    }
  }

  /**
   * Crée une nouvelle famille de chiens
   */
  public async store({ request, response }: HttpContext) {
    try {
      const newFamily = await DogFamilyService.createFamily(request)
      return response.created(newFamily)
    } catch (error) {
      return response.badRequest({ message: error.messages || 'Erreur lors de la création' })
    }
  }

  /**
   * Met à jour une famille de chiens
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      const updatedFamily = await DogFamilyService.updateFamily(params.id, request)
      return response.ok(updatedFamily)
    } catch (error) {
      return response.badRequest({ message: error.messages || `Impossible de mettre à jour la famille ${params.id}` })
    }
  }

  /**
   * Supprime une famille de chiens
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      await DogFamilyService.deleteFamily(params.id)
      return response.ok({ message: 'Famille supprimée avec succès' })
    } catch (error) {
      return response.notFound({ message: `Impossible de supprimer la famille ${params.id}` })
    }
  }
}
