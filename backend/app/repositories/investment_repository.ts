import { BaseRepository } from './base_repository.ts'
import type InvestmentRepositoryInterface from './interfaces/investiment_repository_interface.ts'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
import Investment from '#models/investment'
import { DateTime } from 'luxon'

export default class InvestmentRepository
    extends BaseRepository<Investment>
    implements InvestmentRepositoryInterface<Investment> {

    constructor() {
        super(Investment)
    }

    async findActiveByAccount(accountId:number): Promise<Investment[]> {
        return Investment.query().where('account_id', accountId).whereNull('redeemed_at')
    }

    async redeem(
        investmentId: number,
        trx?: TransactionClientContract
    ): Promise<Investment> {
        const investment = await Investment.query({ client:trx }).where('id', investmentId).firstOrFail()
    
        if (investment.redeemedAt) {
            throw new Error('Investment already redeemed')
        }

        investment.redeemedAt = DateTime.now()
        await investment.save()
        return investment
    }
}