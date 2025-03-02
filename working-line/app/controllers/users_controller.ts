import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  public async index({ response }: HttpContext) {
    const users = await User.all()
    return response.json(users)
  }

  public async show({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return response.json(user)
  }

  public async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    user.merge(request.only(['name', 'email']))
    await user.save()
    return response.json(user)
  }

  public async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.noContent()
  }
}
