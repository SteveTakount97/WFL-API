import type { HttpContext } from '@adonisjs/core/http'
import DogFamilyService from '#services/DogFamilyServices'

export default class DogFamiliesController {
  private dogFamilyService: DogFamilyService

  // Initialisation de la classe DogFamilyService
  constructor() {
    this.dogFamilyService = new DogFamilyService()
  }

  /**
   * Récupérer toutes les familles de chiens
   */
  public async index({ response }: HttpContext) {
    try {
      const families = await this.dogFamilyService.getAllFamilies()
      return response.json(families)
    } catch (error) {
      return response.internalServerError({ message: 'Erreur lors de la récupération des familles', error })
    }
  }

  /**
   * Récupérer une famille par son ID
   */
  public async show({ params, response }: HttpContext) {
    try {
      const family = await this.dogFamilyService.getFamilyById(parseInt(params.id))
      return response.json(family)
    } catch (error) {
      return response.notFound({ message: 'Famille non trouvée', error })
    }
  }

  /**
   * Créer une nouvelle famille
   */
 /* public async store({ request, response }: HttpContext) {
    try {
      const family = await this.dogFamilyService.createFamily(request)
      return response.created(family)
    } catch (error) {
      return response.badRequest({ message: 'Erreur lors de la création de la famille', error })
    }
  }

  /**
   * Mettre à jour une famille
   */
  /*public async update({ params, request, response }: HttpContext) {
    try {
      const family = await this.dogFamilyService.updateFamily(parseInt(params.id), request)
      return response.json(family)
    } catch (error) {
      return response.badRequest({ message: 'Erreur lors de la mise à jour', error })
    }
  }

  /**
   * Supprimer une famille
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      await this.dogFamilyService.deleteFamily(parseInt(params.id))
      return response.noContent()
    } catch (error) {
      return response.notFound({ message: 'Erreur lors de la suppression', error })
    }
  }
}
