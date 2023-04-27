import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Roles from 'App/Enums/Roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('slug', 255).notNullable()
      table.string('email', 255).notNullable().unique()
      table.boolean('is_verified').defaultTo(false)
      table.json('avatar')
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.integer('role_id').unsigned().references('id').inTable('roles').defaultTo(Roles.USER)

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
