import { z } from 'zod'

import { VALID_SCOPES } from './data'
import { createTokenSchema, getTokensSchema } from './schemas'

export type ValidScope = (typeof VALID_SCOPES)[number]

export type Token = {
    id: string
    userId: string
    scopes: ValidScope[]
    token: string
    createdAt: string
    expiresAt: string
}

export type ApiErrorResponse = {
    error: string
    details?: string[]
}

export type ApiSuccessResponse<T> = {
    success: true
    data: T
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>

export type CreateToken = z.infer<typeof createTokenSchema>
export type GetTokens = z.infer<typeof getTokensSchema>
