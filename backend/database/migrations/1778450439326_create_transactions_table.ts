import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('account_id').unsigned().references('id').inTable('accounts')
      table.decimal('amount', 10, 2).notNullable()
      table.enu('type', ['deposit', 'pix', 'transfer', 'withdrawal']).notNullable()
      table.integer('destination_account_id').unsigned().references('id').inTable('accounts').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}