import vine from '@vinejs/vine'

export const TransferValidator = vine.create(
    vine.object({
        accountId: vine.number().exists({table: 'accounts', column: 'id'}),
        destinationAccount: vine.string().exists({table: 'accounts', column: 'account_number'}),
        amount: vine.number().positive().min(0.01),
        type: vine.enum(['transfer', 'pix', 'deposit', 'withdrawal'] as const),
    })
)