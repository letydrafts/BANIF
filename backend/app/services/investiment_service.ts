import { BaseCrudService } from './base_crud_services.ts'
import InvestmentRepository from '../repositories/investment_repository.ts'
import AccountRepository from '../repositories/account_repository.ts'
import TransactionRepository from '../repositories/transaction_repository.ts'
import Investment from '../models/investment.ts'
import db from '@adonisjs/lucid/services/db'

export default class InvestmentService extends BaseCrudService<Investment, InvestmentRepository> {
    private accountRepo = new AccountRepository()
    private transactionRepo = new TransactionRepository()

    constructor() {
        super(new InvestmentRepository())
    }

    async invest(userId: number, type: string, amount: number) {
        const account = await this.accountRepo.findByUserId(userId)
        if (!account) throw new Error('account not found')

        await db.transaction(async (trx) => {

        await this.accountRepo.debit(account.id, amount, trx)


        await Promise.all([
            Investment.create(
            { accountId: account.id, type, amount },
            { client: trx }
            ),
            this.transactionRepo.register(
            { account_id: account.id, type: `investment_${type}`, amount: -amount },
            trx
            ),
        ])
        })
    }

    async redeem(userId: number, investmentId: number) {
        const account = await this.accountRepo.findByUserId(userId)
        if (!account) throw new Error('account not found')

        await db.transaction(async (trx) => {

        const investment = await this.repository.redeem(investmentId, trx)


        await Promise.all([
            this.accountRepo.credit(account.id, Number(investment.amount), trx),
            this.transactionRepo.register(
            { account_id: account.id, type: 'investment_redeem', amount: Number(investment.amount) },
            trx
            ),
        ])
        })
    }

    async listActive(userId: number) {
        const account = await this.accountRepo.findByUserId(userId)
        if (!account) throw new Error('account not found')

        const typeLabel: Record<string, string> = {
        savings: 'savings',
        bonds: 'bonds',
        stocks: 'stocks',
        }

        const investments = await this.repository.findActiveByAccount(account.id)

        return investments.map((inv) => ({
        id: inv.id,
        type: inv.type,
        typeLabel: typeLabel[inv.type] ?? inv.type,
        amount: Number(inv.amount).toFixed(2),
        createdAt: inv.createdAt,
        }))
    }
    }