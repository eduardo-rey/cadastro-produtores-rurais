import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Produtor from './produtor.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Cidade extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cidade: string

  @column()
  declare estado: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Produtor)
  declare produtores: HasMany<typeof Produtor>
}