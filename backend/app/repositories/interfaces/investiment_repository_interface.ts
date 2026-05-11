import type { LucidRow } from '@adonisjs/lucid/types/model'
import type BaseRepositoryInterface from './base_repository_interface.ts'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default interface InvestmentRepositoryInterface<T extends LucidRow>
    extends BaseRepositoryInterface<T> {
    findActiveByAccount(accountId: number): Promise<T[]>
    redeem(investmentId: number, trx: TransactionClientContract): Promise<T>
}