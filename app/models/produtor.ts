import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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
  declare areaTotal: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // static async all() {
  //   const produtoresDados = ProdutorService.read()
  //   const produtores: Produtor[] = []

  //   for (const produtorDados of produtoresDados) {
  //     const produtor = await this.find(produtorDados.produtor_nome)
  //     produtores.push(produtor)
  //   }
  //   // })

  //   return produtores
  // }

  // static async find(produtor_nome: string) {
  //   const produtorEncontrado = await ProdutorService.read({ produtor_nome: produtor_nome })
  //   const produtor = new Produtor()

  //   if (produtorEncontrado[0]) {
  //     produtor.produtor_nome = produtorEncontrado[0].produtor_nome
  //     produtor.fazenda = produtorEncontrado[0].fazenda
  //     produtor.cidade = produtorEncontrado[0].cidade
  //     // produtor.estado = produtorEncontrado[0].estado
  //     produtor.area_aravel = produtorEncontrado[0].area_aravel
  //     produtor.area_vegetacao = produtorEncontrado[0].area_vegetacao
  //   }

  //   return produtor
  // }

}