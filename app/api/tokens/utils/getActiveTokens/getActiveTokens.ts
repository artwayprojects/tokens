import { tokenStore } from '../../storage'

import { type Token } from '@/lib/types'

/**
 * Fetches all non-expired tokens for a user
 * @param userId - The ID of the user to fetch tokens for
 * @returns An array of non-expired tokens
 */
export function getActiveTokens(userId: string): Token[] {
    const allTokens = tokenStore.findByUserId(userId)

    function isExpired(date: Date | string): boolean {
        const targetDate = typeof date === 'string' ? new Date(date) : date

        return targetDate.getTime() <= Date.now()
    }

    return allTokens.filter((token) => !isExpired(token.expiresAt))
}
