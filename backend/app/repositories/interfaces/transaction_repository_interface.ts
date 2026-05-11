import type { LucidRow } from '@adonisjs/lucid/types/model'
import type BaseRepositoryInterface from './base_repository_interface.ts'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default interface TransactionRepositoryInterface<T extends LucidRow>
    extends BaseRepositoryInterface<T> {
        register(data: {
            account_id: number
            type: string
            amount: number
            destination_account_id?: number
        }, trx: TransactionClientContract): Promise<T>
        getStatement(accountId: number): Promise<T[]>
    }