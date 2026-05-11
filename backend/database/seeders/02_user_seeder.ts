import Hash from '@adonisjs/core/services/hash'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'


export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const password = await Hash.make('123456')

    await User.createMany([
      {
        fullName: 'Fred Albuquerque',
        email: 'fredalbuquerde@rotschild.com',
        password: password,
        cpf: '12345678900',
        roleId: 1
      },
      {
        fullName: 'Carlos Alberto',
        email: 'carlos@alberto.com',
        password: password,
        cpf: '09876543210',
        roleId: 2
      }
    ])
  }
}