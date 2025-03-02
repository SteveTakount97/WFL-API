import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import DogFamily from './dog_family.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Dog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string 

  @column()
  declare breed: string

  @column()
  declare age: number

  @belongsTo(() => DogFamily)
  public dogFamily!: relations.BelongsTo<typeof DogFamily>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}