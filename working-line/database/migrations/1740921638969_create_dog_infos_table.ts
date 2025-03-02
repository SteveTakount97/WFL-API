import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dog_infos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('dog_id').unsigned().references('id').inTable('dogs').onDelete('CASCADE') // Clé étrangère vers `dogs`
      table.float('weight')     // Poids
      table.float('height')     // Taille
      table.string('color')     // Couleur du pelage
      table.text('medical_history') // Historique médical
      table.boolean('vaccinated').defaultTo(false) // Statut de vaccination
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}