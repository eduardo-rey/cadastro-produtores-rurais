import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'produtores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('produtor', 100).notNullable()
      table.string('cpf_cnpj', 14).unique().notNullable()
      table.string('fazenda', 100).notNullable()
      table.integer('cidade_id').unsigned().references('cidades.id').nullable()
      table.double('area_agriculturavel').unsigned().notNullable()
      table.double('area_vegetacao').unsigned().notNullable()
      table.double('area_total').unsigned().notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}