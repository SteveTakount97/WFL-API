import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'breeding_compatibilities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('dog1_id').unsigned().references('id').inTable('dogs').onDelete('CASCADE')  // Clé étrangère vers `dogs`
      table.integer('dog2_id').unsigned().references('id').inTable('dogs').onDelete('CASCADE')  // Clé étrangère vers `dogs`
      table.string('result')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}