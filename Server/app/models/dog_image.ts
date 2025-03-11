import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import Dog from './dog.js'
import Image from './image.js'

export default class DogImage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare dogId: number

  @column()
  declare imageId: number

  @column()
  declare isDefault: boolean

  @belongsTo(() => Dog)
  declare dog: relations.BelongsTo<typeof Dog>

  @belongsTo(() => Image)
  declare image: relations.BelongsTo<typeof Image>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}