import { randomUUID } from 'node:crypto'

import { tokenStore } from '../storage'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

import type { Token, CreateToken, ApiErrorResponse } from '@/lib/types'

export function createToken(request: CreateToken): Token {
    const token: Token = {
        id: randomUUID(),
        userId: request.userId,
        scopes: request.scopes,
        token: randomUUID(),
        createdAt: new Date().toISOString(),
        expiresAt: calculateExpiryDate(request.expiresInMinutes).toISOString(),
    }

    tokenStore.save(token)

    return token
}

export function calculateExpiryDate(minutesToAdd: number): Date {
    return new Date(Date.now() + minutesToAdd * 60 * 1000)
}

export function isValidApiKey(request: NextRequest): boolean {
    const apiKey = request.headers.get('X-API-Key')

    return apiKey === process.env.NEXT_PUBLIC_API_KEY
}

export function unauthorizedResponse(): NextResponse<ApiErrorResponse> {
    return NextResponse.json<ApiErrorResponse>(
        {
            error: 'Unauthorized, please add API_KEY to the environment variables',
        },
        { status: 401 }
    )
}

/**
 * Centralized error handler for API routes.
 * Provides consistent error responses across all endpoints.
 *
 */
export function handleApiError(error: unknown): NextResponse<ApiErrorResponse> {
    if (error instanceof ZodError) {
        return NextResponse.json<ApiErrorResponse>(
            {
                error: 'Validation failed',
                details: error.issues.map(
                    (e) => `${e.path.join('.')}: ${e.message}`
                ),
            },
            { status: 400 }
        )
    }

    if (error instanceof SyntaxError) {
        return NextResponse.json<ApiErrorResponse>(
            { error: 'Invalid JSON in request body' },
            { status: 400 }
        )
    }

    return NextResponse.json<ApiErrorResponse>(
        { error: 'Internal server error' },
        { status: 500 }
    )
}
