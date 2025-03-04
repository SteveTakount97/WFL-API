/** 

import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthService {
  /**
   * Crée un utilisateur avec un rôle donné
   * @param data - Données de l'utilisateur (email, mot de passe, nom, rôle)
   */
  /*public async registerUser(data: { email: string, password: string, name: string, role: string = 'user' }) {
    // Créer un utilisateur avec un rôle par défaut
    const user = await User.create({
      ...data,
      role: data.role || 'user',  // Assure un rôle par défaut, ici 'user'
    })
    return user
  }

  /**
   * Vérifie les identifiants d'un utilisateur (email et mot de passe)
   * @param email - Email de l'utilisateur
   * @param password - Mot de passe de l'utilisateur
   */
  /*public async loginUser(email: string, password: string) {
    const user = await User.findByOrFail('email', email)

    // Vérifier si le mot de passe correspond
    if (!(await hash.verify(user.password, password))) {
      throw new Error('Invalid credentials')
    }

    return user
  }

  /**
   * Génère un token pour un utilisateur authentifié
   * @param user - L'utilisateur pour lequel générer le token
   */
  /*public async generateToken(user: User, auth: HttpContext['auth']) {
    return await auth.use('api').generate(user)
  }

  /**
   * Déconnecte un utilisateur
   * @param auth - L'objet d'authentification
   */
  /*public async logoutUser(auth: HttpContext['auth']) {
    await auth.use('api').delete()
  } */
  

