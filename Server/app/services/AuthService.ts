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
      role: data.role,
      password: hashedPassword,
      identifier: string.random(10),
    })

    return newUser
  }

  static async authenticateUser(data: any) {
    const user = await User.findBy('email', data.email)
    if (!user) {
      throw new Error('User not found')
    }

    const passwordVerified = await hash.verify(data.password, user.password)
    console.log(`Password match for user ${data.email}: ${passwordVerified}`);
    console.log('Stored password hash:', user.password); // Affiche le mot de passe stocké
    console.log('Password entered by user:', data.password); // Affiche le mot de passe entré
    console.log('Password verified:', passwordVerified);
    if (!passwordVerified) {
      throw new Error('Invalid credentials') 
    }

    // Générer un token JWT pour l'utilisateur
    const token = await User.accessTokens.create(user, ['api'], {
      name: 'API Token',
    })

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
    if (!auth.use('api').isLoggedIn) {
      throw new Error('User is already logged out')
    }
    await auth.use('api').revoke()
    return 'Logged out successfully'
  }

  private static async regenerateSecureKey(user: any) {
    user.secureKey = string.random(12)
  }
}
