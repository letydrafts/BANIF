import { BaseRepository } from './base_repository.ts'
import type TransactionRepositoryInterface from './interfaces/transaction_repository_interface.ts'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
import Transaction from '#models/transaction'

export default class TransactionRepository
    extends BaseRepository<Transaction>
    implements TransactionRepositoryInterface<Transaction> {

    constructor() {
        super(Transaction)
    }

    async register(
        data: {
            account_id: number
            type: string
            amount: number
            destination_account_id?: number
        },
        trx: TransactionClientContract
    ): Promise<Transaction> {
        return Transaction.create(data, { client: trx })
    }

    async getStatement(accountId: number): Promise<Transaction[]> {
        return Transaction
            .query()
            .where('account_id', accountId)
            .orderBy('created_at', 'desc')
    }
}
