import User from '#models/user' 
import hash from '@adonisjs/core/services/hash'
import string from '@adonisjs/core/helpers/string'

export default class AuthService {
  static async registerUser(data: any) {
    if (!data.username || !data.email || !data.password || !data.full_name || !data.role) {
      throw new Error('Missing required fields')
    }

    const existingUserEmail = await User.findBy('email', data.email)
    if (existingUserEmail) {
      throw new Error('Email already exists')
    }

    const existingUserName = await User.findBy('full_name', data.full_name)
    if (existingUserName) {
      throw new Error('First name already exists')
    }

    const hashedPassword = await hash.make(data.password)

     // Générer une secureKey
    const securekey = string.random(12) 

    // Crée l'utilisateur sans inclure secureKey
    const newUser = await User.create({
      full_name: data.full_name,
      email: data.email,
      username: data.username,
      securekey: securekey, 
      password: hashedPassword,
      identifier: string.random(10),
    })

    return newUser
  }

  static async authenticateUser(email: string, password: string) {
    const user = await User.findBy('email', email)
    if (!user) {
      throw new Error('User not found')
    }

    const passwordVerified = await hash.verify(user.password, password)
    if (!passwordVerified) {
      throw new Error('Invalid credentials')
    }

    const token = await user.use('api').generate()

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
  }
}
