// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    const data = request.only(['email', 'password', 'name'])
    const user = await User.create(data)
    return response.created({ user })
  }

  public async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.findByOrFail('email', email)

    if (!(await hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    const token = await auth.use('api').generate(user)
    return response.json({ token })
  }

  public async logout({ response, auth }: HttpContext) {
    await auth.use('api').delete()
    return response.ok({ message: 'Logged out successfully' })
  }
}
