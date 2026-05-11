import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Adress from '#models/address'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
  await Adress.createMany([
    {
      userId: 1,
      city: 'Curitiba',
      state: 'PR',
      streetNumber: 'Avenida das Torres, 503',
    },
    {
      userId: 2,
      city: 'São Paulo',
      state: 'SP',
      streetNumber: 'Avenida Paulista, 123',
    }
  ])
  }
}