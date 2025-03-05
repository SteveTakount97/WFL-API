import User from '#models/user'
import { schema, rules } from '@adonisjs/validator'

export default class UserService {
  /**
   * Récupère tous les utilisateurs
   */
  public async getAllUsers() {
    return await User.all()
  }

  /**
   * Récupère un utilisateur par son ID
   * @param id ID de l'utilisateur
   */
  public async getUserById(id: number) {
    return await User.findOrFail(id)
  }

  /**
   * Met à jour un utilisateur avec des données validées
   * @param id ID de l'utilisateur à mettre à jour
   * @param data Données mises à jour
   */
  public async updateUser(id: number, data: any) {
    const user = await User.findOrFail(id)

    // Validation stricte des entrées utilisateur
    const userSchema = schema.create({
      name: schema.string.optional([rules.minLength(3)]),
      email: schema.string.optional([rules.email()]),
    })
    const payload = await data.validate({ schema: userSchema })

    // Fusionne les nouvelles données et enregistre
    user.merge(payload)
    await user.save()
    return user
  }

  /**
   * Supprime un utilisateur par son ID
   * @param id ID de l'utilisateur à supprimer
   */
  public async deleteUser(id: number) {
    const user = await User.findOrFail(id)
    await user.delete()
  }
}
