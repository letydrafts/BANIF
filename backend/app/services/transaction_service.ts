import { BaseCrudService } from './base_crud_services.ts'
import TransactionRepository from '../repositories/transaction_repository.ts'
import AccountRepository from '../repositories/account_repository.ts'
import Transaction from '../models/transaction.ts'
import db from '@adonisjs/lucid/services/db'

export default class TransactionService extends BaseCrudService<Transaction, TransactionRepository> {
    private accountRepo = new AccountRepository()

    constructor() {
        super(new TransactionRepository())
    }

    async transfer(fromUserId: number, destinationAccountNumber: string, amount: number) {
        const [originAccount, destinationAccount] = await Promise.all([
        this.accountRepo.findByUserId(fromUserId),
        this.accountRepo.findByAccountNumber(destinationAccountNumber),
        ])

        if (!originAccount) throw new Error('account not found')
        if (!destinationAccount) throw new Error('destination account not found')
        if (originAccount.id === destinationAccount.id) {
        throw new Error('is not possible transfer to the same account')
        }

        await db.transaction(async (trx) => {
        await this.accountRepo.debit(originAccount.id, amount, trx)
        await this.accountRepo.credit(destinationAccount.id, amount, trx)

        await Promise.all([
            this.repository.register(
            { account_id: originAccount.id, type: 'pix', amount: -amount,
                destination_account_id: destinationAccount.id },
            trx
            ),
            this.repository.register(
            { account_id: destinationAccount.id, type: 'pix', amount,
                destination_account_id: originAccount.id },
            trx
            ),
        ])
        })
    }

    async getStatement(userId: number) {
        const account = await this.accountRepo.findByUserId(userId)
        if (!account) throw new Error('account not found')

        const transactions = await this.repository.getStatement(account.id)

        return transactions.map((t) => ({
        id: t.id,
        type: t.type,
        amount: t.amount > 0
            ? `+${Number(t.amount).toFixed(2)}`
            : Number(t.amount).toFixed(2),
        rawAmount: Number(t.amount),
        date: t.createdAt,
        }))
    }
    }