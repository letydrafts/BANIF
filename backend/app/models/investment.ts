import { InvestmentSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Account from './account.ts'


export default class Investment extends InvestmentSchema {
    @belongsTo(()=> Account)
    declare account: BelongsTo<typeof Account>
}