// import type { HttpContext } from '@adonisjs/core/http'

import BreedingTest from '#models/breeding_test'
import { HttpContext } from '@adonisjs/core/http'

export default class BreedingTestsController {
  // Vérifier la compatibilité entre deux chiens
  public async testCompatibility({ request, response }: HttpContext) {
    const { dog1_id, dog2_id } = request.only(['dog1_id', 'dog2_id'])

    // Logique fictive de compatibilité (exemple)
    const isCompatible = Math.random() > 0.5 // 50% de chance

    const test = await BreedingTest.create({ dog1_id, dog2_id, is_compatible: isCompatible })
    return response.json(test)
  }
}
