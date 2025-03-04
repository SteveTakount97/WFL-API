import DogFamily from '#models/dog_family'
/*import { schema, rules } from '@adonisjs/validator' */

export default class DogFamilyService {
  /**
   * Récupère toutes les familles de chiens
   */
  public async getAllFamilies() {
    try {
      // Retourne toutes les familles de chiens
      return await DogFamily.all()
    } catch (error) {
      // Gestion des erreurs en cas de problème de récupération
      throw new Error('Impossible de récupérer les familles de chiens.')
    }
  }

  /**
   * Récupère une famille de chiens par son ID
   * @param id ID de la famille
   */
  public async getFamilyById(id: number) {
    try {
      // Recherche de la famille par son ID, ou échec si l'ID est introuvable
      return await DogFamily.findOrFail(id)
    } catch (error) {
      // Gestion des erreurs si la famille n'est pas trouvée
      throw new Error(`La famille avec l'ID ${id} n'a pas été trouvée.`)
    }
  }

  /**
   * Crée une nouvelle famille avec validation
   * @param data Données à valider pour créer la famille
   */
  /* public async createFamily(data: any) {
    // Définition du schéma de validation des données
    const dogFamilySchema = schema.create({
      parent_id: schema.number([rules.exists({ table: 'dogs', column: 'id' })]),
      child_id: schema.number([rules.exists({ table: 'dogs', column: 'id' })]),
    })

    try {
      // Validation des données entrantes
      const payload = await data.validate({ schema: dogFamilySchema })
      
      // Création de la famille de chien après validation
      return await DogFamily.create(payload)
    } catch (error) {
      // Gestion des erreurs de validation
      throw new Error('Les données fournies sont invalides. Vérifiez les parents et enfants.')
    }
  }

  /**
   * Met à jour une famille existante
   * @param id ID de la famille à mettre à jour
   * @param data Données à valider et mettre à jour
   */
 /* public async updateFamily(id: number, data: any) {
    try {
      // Recherche de la famille à mettre à jour
      const family = await DogFamily.findOrFail(id)

      /* Définition du schéma de validation des données
      const dogFamilySchema = schema.create({
        parent_id: schema.number.optional([rules.exists({ table: 'dogs', column: 'id' })]),
        child_id: schema.number.optional([rules.exists({ table: 'dogs', column: 'id' })]),
      })

      // Validation des données entrantes
      const payload = await data.validate({ schema: dogFamilySchema })
      
      // Mise à jour de la famille avec les nouvelles données validées
      family.merge(payload)
      await family.save()

      // Retourne la famille mise à jour
      return family
    } catch (error) {
      // Gestion des erreurs si la famille n'est pas trouvée ou si la validation échoue
      throw new Error(`Impossible de mettre à jour la famille avec l'ID ${id}.`)
    }
  }

  /**
   * Supprime une famille
   * @param id ID de la famille à supprimer
   */
  public async deleteFamily(id: number) {
    try {
      // Recherche de la famille à supprimer
      const family = await DogFamily.findOrFail(id)
      
      // Suppression de la famille de chien
      await family.delete()
    } catch (error) {
      // Gestion des erreurs si la famille n'est pas trouvée
      throw new Error(`Impossible de supprimer la famille avec l'ID ${id}.`)
    }
  }
}
