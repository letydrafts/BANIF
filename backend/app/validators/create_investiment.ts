import vine from '@vinejs/vine'

export const createInvestiment = vine.create(
    vine.object({
        type: vine.enum(['savings', 'bonds', 'stock'] as const),
        // savings = poupança, bonds = títulos, stocks = ações
        amount: vine.number().positive(),

    })
)