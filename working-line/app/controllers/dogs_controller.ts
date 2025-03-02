// import type { HttpContext } from '@adonisjs/core/http'

import Dog from '#models/dog'
import { HttpContext } from '@adonisjs/core/http'

export default class DogsController {
  // Ajouter un chien
  public async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'breed', 'date_of_birth', 'owner_id'])
    const dog = await Dog.create(data)
    return response.created(dog)
  }

  // Récupérer tous les chiens
  public async index({ response }: HttpContext) {
    const dogs = await Dog.all()
    return response.json(dogs)
  }

  // Récupérer un chien par ID
  public async show({ params, response }: HttpContext) {
    const dog = await Dog.findOrFail(params.id)
    return response.json(dog)
  }

  // Modifier un chien
  public async update({ params, request, response }: HttpContext) {
    const dog = await Dog.findOrFail(params.id)
    dog.merge(request.only(['name', 'breed', 'date_of_birth']))
    await dog.save()
    return response.json(dog)
  }

  // Supprimer un chien
  public async destroy({ params, response }: HttpContext) {
    const dog = await Dog.findOrFail(params.id)
    await dog.delete()
    return response.noContent()
  }
}
