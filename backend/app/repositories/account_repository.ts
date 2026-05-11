// app/repositories/account_repository.ts
import { BaseRepository } from './base_repository.ts'
import type AccountRepositoryInterface from './interfaces/account_repository_interface.ts'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
import Account from '#models/account'

export default class AccountRepository
    extends BaseRepository<Account>
    implements AccountRepositoryInterface<Account> {

    constructor() {
        super(Account)
    }

    async findByUserId(userId: number): Promise<Account | null> {
        return Account.query().where('user_id', userId).first()
    }

    async findByAccountNumber(accountNumber: string): Promise<Account | null> {
        return Account.query().where('account_number', accountNumber).first()
    }

    async debit(
        accountId: number,
        amount: number,
        trx: TransactionClientContract
    ): Promise<Account> {
    const account = await Account
        .query({ client: trx })
        .where('id', accountId)
        .firstOrFail()

    if (Number(account.balance) < amount) {
        throw new Error('insufficient funds')
    }

    account.balance = Number(account.balance) - amount
    await account.save()
    return account
    }

    async credit(
        accountId: number,
        amount: number,
        trx: TransactionClientContract
    ): Promise<Account> {
    const account = await Account
        .query({ client: trx })
        .where('id', accountId)
        .firstOrFail()

    account.balance = Number(account.balance) + amount
    await account.save()
    return account
    }
}