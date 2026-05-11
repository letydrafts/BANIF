import type { LucidRow } from '@adonisjs/lucid/types/model'
import BaseRepositoryInterface from './base_repository_interface.ts'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default interface AccountRepositoryInterface<T extends LucidRow>
    extends BaseRepositoryInterface<T> {
        findByUserId(userId: number): Promise<T | null>
        findByAccountNumber(accountNumber: string): Promise<T | null>
        debit(accountId: number, amount: number, trx: TransactionClientContract): Promise<T>
        credit(accountId: number, amount: number, trx: TransactionClientContract): Promise<T>
    }