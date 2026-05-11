import vine from '@vinejs/vine'

export const createUser = vine.create(
    vine.object({
        fullName: vine.string().minLength(3).maxLength(255),
        email: vine.string()
            .email()
            .unique({table: 'users', column: 'email'}),
        password: vine.string().minLength(6).maxLength(255),
        cpf: vine.string().minLength(11).maxLength(11).unique({table: 'users', column: 'cpf'}),
        address: vine.object({
            city: vine.string().minLength(2).maxLength(255),
            state: vine.string().minLength(2).maxLength(255),
            streetNumber: vine.string().minLength(2).maxLength(255),
        }),
    })
)
