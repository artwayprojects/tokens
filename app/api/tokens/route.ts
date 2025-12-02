import { NextRequest, NextResponse } from 'next/server'
import { createTokenSchema, getTokensSchema } from '@/lib/schemas'
import { handleApiError, isValidApiKey, unauthorizedResponse } from './utils'
import { getActiveTokens, createToken } from './utils'

import type { Token, ApiErrorResponse, CreateToken } from '@/lib/types'

/**
 * POST /api/tokens
 * Create a new token for a user
 */
export const POST = async (
    request: NextRequest
): Promise<NextResponse<Token | ApiErrorResponse>> => {
    if (!isValidApiKey(request)) {
        return unauthorizedResponse()
    }

    try {
        await sleep(500) // to show frontend spinner

        const body: unknown = await request.json()

        const validatedData: CreateToken = createTokenSchema.parse(body)

        const token = createToken(validatedData)

        return NextResponse.json<Token>(token, {
            status: 201,
        })
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * GET /api/tokens?userId=123
 * List all non-expired tokens for a user
 */
export const GET = async (
    request: NextRequest
): Promise<NextResponse<Token[] | ApiErrorResponse>> => {
    if (!isValidApiKey(request)) {
        return unauthorizedResponse()
    }

    try {
        await sleep(500) // to show frontend spinner

        const { searchParams } = new URL(request.url)

        const userId = searchParams.get('userId')

        const validatedQuery = getTokensSchema.parse({ userId })

        const tokens = getActiveTokens(validatedQuery.userId)

        return NextResponse.json<Token[]>(tokens)
    } catch (error) {
        return handleApiError(error)
    }
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
