import { BaseRepository } from './base_repository.ts'
import User from '#models/user'

export default class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User)
    }

    async findByEmail(email:string): Promise<User | null> {
        return User.query().where('email', email).first()
    }

    async findWithAccount(userId: number): Promise<User | null> {
        return User.query().where('id', userId).preload('accounts').preload('address').first()
    }
}
