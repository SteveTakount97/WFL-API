import DogFamily from '#models/dog_family'
import { schema, rules } from '@adonisjs/validator'

export default class DogFamilyService {
  /**
   * Récupérer toutes les familles de chiens
   */
  public static async getAllFamilies() {
    return await DogFamily.all()
  }

  /**
   * Récupérer une famille de chien par son ID
   */
  public static async getFamilyById(id: number) {
    return await DogFamily.findOrFail(id)
  }

  /**
   * Créer une nouvelle famille de chiens avec validation
   */
  public static async createFamily(data: any) {
    const dogFamilySchema = schema.create({
      familyname: schema.string({}, [rules.unique({ table: 'dogs_family', column: 'familyname' })]),
      description: schema.string.optional(),
    })

    const payload = await data.validate({ schema: dogFamilySchema })
    return await DogFamily.create(payload)
  }

  /**
   * Mettre à jour une famille de chiens
   */
  public static async updateFamily(id: number, data: any) {
    const family = await DogFamily.findOrFail(id)

    const dogFamilySchema = schema.create({
      familyname: schema.string.optional({}, [rules.unique({ table: 'dog_families', column: 'familyName' })]),
      description: schema.string.optional(),
    })

    const payload = await data.validate({ schema: dogFamilySchema })

    family.merge(payload)
    await family.save()

    return family
  }

  /**
   * Supprimer une famille de chiens
   */
  public static async deleteFamily(id: number) {
    const family = await DogFamily.findOrFail(id)
    await family.delete()
    return { message: 'Famille supprimée avec succès' }
  }
}
