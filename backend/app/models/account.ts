import { AccountSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.ts'
import Transaction from './transaction.ts'
import Investment from './investment.ts'


export default class Account extends AccountSchema {
    @belongsTo(() => User)
    declare user: BelongsTo<typeof User>

    @hasMany(() => Transaction)
    declare transactions: HasMany<typeof Transaction>

    @hasMany(()=> Investment)
    declare investments: HasMany<typeof Investment>
}