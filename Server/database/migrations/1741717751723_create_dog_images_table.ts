import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dog_images'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('dog_id').unsigned().references('id').inTable('dogs').onDelete('CASCADE')
      table.bigInteger('image_id').unsigned().references('id').inTable('images').onDelete('CASCADE')
      table.boolean('is_default').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}