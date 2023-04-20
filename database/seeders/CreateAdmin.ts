import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.create({
      name: 'Admin',
      email: 'admin@admin.com',
      password: '123456',
      roleId: 2,
    })
  }
}
