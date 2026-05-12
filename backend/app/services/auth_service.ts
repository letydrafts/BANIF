import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.ts'

export default class AuthService {
    async login(_ctx: HttpContext, email: string, password: string) {
    
    const user = await User.verifyCredentials(email, password)


    const token = await User.accessTokens.create(user)

    return {
        token: token.value!.release(),
        user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        },
    }
}

    async logout(ctx: HttpContext) {
        const user = ctx.auth.use('api').user!

 
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }
}