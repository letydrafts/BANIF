import { BaseCrudService } from './base_crud_services.ts'
import AccountRepository from '../repositories/account_repository.ts'
import Account from '../models/account.ts'

export default class AccountService extends BaseCrudService<Account, AccountRepository> {
    constructor() {
        super(new AccountRepository())
    }

    async getBalance(userId: number) {
        const account = await this.repository.findByUserId(userId)

    if (!account) throw new Error('account not found')

    return {
        account_number: account.accountNumber,
        agency_number: account.agencyNumber,
        balance: Number(account.balance),
        }
    }
}