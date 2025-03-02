import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import Dog from './dog.js'

export default class BreedingCompatibility extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare dog1Id: number

  @column()
  declare dog2Id: number

  @column()
  declare compatibilityScore: number

  @column()
  declare result: string

  @belongsTo(() => Dog, { foreignKey: 'dog1Id' })
  public dog1!: relations.BelongsTo<typeof Dog>

  @belongsTo(() => Dog, { foreignKey: 'dog2Id' })
  public dog2!: relations.BelongsTo<typeof Dog>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}