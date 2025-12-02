import { getActiveTokens } from './getActiveTokens'
import { tokenStore } from '../../storage'

import type { Token } from '@/lib/types'

jest.mock('@/app/api/tokens/storage', () => ({
    tokenStore: {
        findByUserId: jest.fn(),
        save: jest.fn(),
    },
}))

const mockedTokenStore = tokenStore as jest.Mocked<typeof tokenStore>

describe('getActiveTokens', () => {
    const userId = 'test-user-123'

    beforeEach(() => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date('2025-01-01T12:00:00.000Z'))
        jest.clearAllMocks()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('should filter out expired tokens and return only active ones', () => {
        const tokens: Token[] = [
            {
                id: '1',
                userId,
                scopes: ['read'],
                token: 'token-1',
                createdAt: '2025-01-01T11:00:00.000Z',
                expiresAt: '2025-01-01T13:00:00.000Z', // Future - valid
            },
            {
                id: '2',
                userId,
                scopes: ['write'],
                token: 'token-2',
                createdAt: '2025-01-01T10:00:00.000Z',
                expiresAt: '2025-01-01T11:00:00.000Z', // Past - expired
            },
        ]

        mockedTokenStore.findByUserId.mockReturnValue(tokens)

        const result = getActiveTokens(userId)

        expect(result).toHaveLength(1)
        expect(result[0].id).toBe('1')
    })

    it('should return empty array when all tokens are expired', () => {
        const tokens: Token[] = [
            {
                id: '1',
                userId,
                scopes: ['read'],
                token: 'token-1',
                createdAt: '2025-01-01T09:00:00.000Z',
                expiresAt: '2025-01-01T10:00:00.000Z',
            },
        ]

        mockedTokenStore.findByUserId.mockReturnValue(tokens)

        const result = getActiveTokens(userId)

        expect(result).toHaveLength(0)
    })

    it('should treat token expiring exactly at current time as expired', () => {
        const tokens: Token[] = [
            {
                id: '1',
                userId,
                scopes: ['read'],
                token: 'token-1',
                createdAt: '2025-01-01T11:00:00.000Z',
                expiresAt: '2025-01-01T12:00:00.000Z', // Exactly now
            },
        ]

        mockedTokenStore.findByUserId.mockReturnValue(tokens)

        const result = getActiveTokens(userId)

        expect(result).toHaveLength(0)
    })

    it('should return empty array when user has no tokens', () => {
        mockedTokenStore.findByUserId.mockReturnValue([])

        const result = getActiveTokens(userId)

        expect(result).toHaveLength(0)
    })
})
