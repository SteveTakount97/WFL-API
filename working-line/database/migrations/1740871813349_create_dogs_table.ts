import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dogs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nameDog')
      table.string('breed')
      table.integer('age')
      table.integer('dog_family_id').unsigned().nullable()
      table.foreign('dog_family_id').references('id').inTable('dog_families')
      table.integer('owner_id').unsigned().references('id').inTable('users')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}