import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import DogFamily from './dog_family.js'
import User from './user.js'
import * as relations from '@adonisjs/lucid/types/relations'
import DogInfo from './dog_info.js'

export default class Dog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare familyId: number

  @column()
  declare name: string 

  @column()
  declare breed: string

  @column()
  declare age: number

  @column.date()
  declare birthdate: DateTime

  @column()
  declare gender: 'male' | 'female'

  @column()
  declare description: string 

  @belongsTo(() => DogFamily)
  public dogFamily!: relations.BelongsTo<typeof DogFamily>

  @belongsTo(() => User)
  public owner!: relations.BelongsTo<typeof User>;
  
  @hasOne(() => DogInfo)
  public doginfo!: relations.HasOne<typeof DogInfo>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}