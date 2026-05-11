import vine from '@vinejs/vine'

export const createAccountValidator = vine.create(
    vine.object({
        userId: vine.number().exists({table: 'users', column: 'id'}),
        accountNumber: vine.string().minLength(1).maxLength(255).unique({table: 'accounts', column: 'account_number'}),
        agencyNumber: vine.string().fixedLength(4),
        balance: vine.number().positive(),
    })
)

