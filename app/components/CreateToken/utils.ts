import type { ApiErrorResponse, Token, CreateToken } from '@/lib/types'

export async function createToken(payload: CreateToken): Promise<Token> {
    const response = await fetch('/api/tokens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': process.env.NEXT_PUBLIC_API_KEY ?? '',
        },
        body: JSON.stringify(payload),
    })

    const data: Token | ApiErrorResponse = await response.json()

    if (!response.ok) {
        const errorData = data as ApiErrorResponse
        throw new Error(errorData.details?.join(', ') || errorData.error)
    }

    return data as Token
}
