import { BaseCrudService } from './base_crud_services.ts'
import UserRepository from '../repositories/user_repository.ts'
import AccountRepository from '../repositories/account_repository.ts'
import User from '../models/user.ts'
import Address from '../models/address.ts'
import db from '@adonisjs/lucid/services/db'
import { randomInt } from 'node:crypto'

export default class UserService extends BaseCrudService<User, UserRepository> {
    private accountRepo = new AccountRepository()

    constructor() {
        super(new UserRepository())
    }


    async createClient(data: {
        full_name: string
        email: string
        password: string
        cpf: string
        address: { city: string; state: string; streetNumber: string; number: string }
    }): Promise<User> {
        return db.transaction(async (trx) => {
            const user = await User.create(
        {
            fullName: data.full_name,
            email: data.email,
            password: data.password,
            cpf: data.cpf,
            roleId: 2, // cliente
        },
        { client: trx }
        )


    await Promise.all([
        Address.create(
        {
            userId: user.id,
            city: data.address.city,
            state: data.address.state,
            streetNumber: data.address.streetNumber,
        },
        { client: trx }
        ),
        this.accountRepo.create({
        userId: user.id,
        accountNumber: String(randomInt(100000, 999999)),
        agencyNumber: '0001',
        balance: 0,
        } as any),
        ])

        return user
        })
    }


    async listClients(): Promise<User[]> {
        return this.repository.allWith(['address', 'accounts'])
    }
}