// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import DogFamily from '#models/dog_family'

export default class DogFamiliesController {
  public async index({ response }: HttpContext) {
    const families = await DogFamily.all()
    return response.json(families)
  }

  public async show({ params, response }: HttpContext) {
    const family = await DogFamily.findOrFail(params.id)
    return response.json(family)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['parent_id', 'child_id'])
    const family = await DogFamily.create(data)
    return response.created(family)
  }

  public async update({ params, request, response }: HttpContext) {
    const family = await DogFamily.findOrFail(params.id)
    family.merge(request.only(['parent_id', 'child_id']))
    await family.save()
    return response.json(family)
  }

  public async destroy({ params, response }: HttpContext) {
    const family = await DogFamily.findOrFail(params.id)
    await family.delete()
    return response.noContent()
  }
}
