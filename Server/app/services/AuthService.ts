import User from '#models/user'
import string from '@adonisjs/core/helpers/string'

export default class AuthService {
  static async registerUser(data: any) {
    // Vérification de la présence des champs obligatoires
    if (!data.email || !data.password || !data.full_name || !data.username || !data.role) {
      throw new Error('Missing required fields')
    }

    // Vérification de l'existence de l'email et du username
    const existingUser = await User.query()
      .where('email', data.email)
      .orWhere('username', data.username)
      .first()

    if (existingUser) {
      throw new Error(
        existingUser.email === data.email ? 'Email already exists' : 'Username already exists'
      )
    }

    // Création du nouvel utilisateur
    const newUser = await User.create({
      ...data,
      identifier: string.random(10),
      secureKey: string.random(12),
    })

    return newUser
  }

  static async authenticateUser(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user, ['api'], { name: 'API Token' })

    if (!user.identifier) {
      user.identifier = string.random(10)
      await user.save()
      await this.regenerateSecureKey(user)
    } else {
      await user.save()
    }

    return { user, token }
  }

  static async logoutUser(auth: any) {
    const user = await auth.use('api').authenticate()
    if (!user) throw new Error('No authenticated user found')

    await auth.use('api').revoke()
    return 'Logged out successfully'
  }

  private static async regenerateSecureKey(user: any) {
    user.secureKey = string.random(12)
    await user.save()
  }
}
