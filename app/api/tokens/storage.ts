import type { Token } from '@/lib/types'

class TokenStore {
    private tokens: Map<string, Token> = new Map()
    private userIndex: Map<string, Set<string>> = new Map() // O(1) lookup time for user tokens

    save(token: Token): void {
        this.tokens.set(token.id, token)

        if (!this.userIndex.has(token.userId)) {
            this.userIndex.set(token.userId, new Set())
        }
        this.userIndex.get(token.userId)!.add(token.id)
    }

    findByUserId(userId: string): Token[] {
        const tokenIds = this.userIndex.get(userId)
        if (!tokenIds || tokenIds.size === 0) {
            return []
        }

        const userTokens: Token[] = []

        for (const tokenId of tokenIds) {
            const token = this.tokens.get(tokenId)
            if (token) {
                userTokens.push(token)
            }
        }
        return userTokens
    }
}
export const tokenStore = new TokenStore()
