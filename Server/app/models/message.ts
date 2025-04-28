import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare senderId: number

  @column()
  declare receiverId: number

  @column()
  declare content: string | null

  @belongsTo(() => User, { foreignKey: 'senderId' })
  public sender!: relations.BelongsTo<typeof User>;

  @belongsTo(() => User, { foreignKey: 'receiverId' })
  public receiver!: relations.BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}