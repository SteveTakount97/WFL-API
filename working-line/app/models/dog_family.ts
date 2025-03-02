import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Dog from './dog.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class DogFamily extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare familyName: string

  // Définition de la relation "DogFamily has many Dogs"
  @hasMany(() => Dog)
  public dogs!: relations.HasMany<typeof Dog> 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}