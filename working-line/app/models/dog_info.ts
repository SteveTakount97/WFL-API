import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import Dog from './dog.js'

export default class DogInfo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare dogId: number  

  @column()
  declare weight: number  // Poids du chien (en kg)

  @column()
  declare height: number  // Taille du chien (en cm)

  @column()
  declare color: string  // Couleur du pelage

  @column()
  declare medicalHistory: string  // Antécédents médicaux

  @column()
  declare vaccinated: boolean  // Chien vacciné ou non

  // Relation avec Dog
  @belongsTo(() => Dog)
  public dog!: relations.BelongsTo<typeof Dog>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}