import { type Token, type ApiErrorResponse } from '@/lib/types'

/**
 * Fetches tokens for a specific user
 */
export async function searchTokens(userId: string): Promise<Token[]> {
    const response = await fetch(
        `/api/tokens?userId=${encodeURIComponent(userId)}`,
        {
            headers: {
                'X-API-Key': process.env.NEXT_PUBLIC_API_KEY ?? '',
            },
        }
    )

    const data: Token[] | ApiErrorResponse = await response.json()

    if (!response.ok) {
        const errorData = data as ApiErrorResponse

        throw new Error(errorData.details?.join(', ') || errorData.error)
    }

    return data as Token[]
}
