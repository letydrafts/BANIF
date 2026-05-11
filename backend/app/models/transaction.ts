import { TransactionSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Account from './account.ts'

export default class Transaction extends TransactionSchema {
    @belongsTo(()=> Account, {
        foreignKey: 'accountId',
    })
    declare account: BelongsTo<typeof Account>

    @belongsTo(()=> Account, {
        foreignKey: 'destinationAccountId',
    })
    declare destinationAccount: BelongsTo<typeof Account>   
}