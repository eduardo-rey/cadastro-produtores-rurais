import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Cidade from './cidade.js'
import Cultura from './cultura.js'

// import ProdutorService from "#services/produtor_service"

export default class Produtor extends BaseModel {
  static table = 'produtores'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare produtor: string

  @column()
  declare cpfCnpj: string

  @column()
  declare fazenda: string

  @column()
  declare cidadeId: number

  @column()
  declare areaAgriculturavel: number

  @column()
  declare areaVegetacao: number

  @column()
  declare areaTotal: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Cidade)
  declare cidade: BelongsTo<typeof Cidade>

  @manyToMany(() => Cultura)
  declare culturas: ManyToMany<typeof Cultura>

}