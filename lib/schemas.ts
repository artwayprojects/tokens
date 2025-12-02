import { z } from 'zod'

import { VALID_SCOPES } from './data'

export const createTokenSchema = z.object({
    userId: z
        .string()
        .min(1, 'User ID is required')
        .max(100, 'User ID must be at most 100 characters'),
    scopes: z
        .array(z.enum([...VALID_SCOPES]))
        .min(1, 'At least one scope is required'),
    expiresInMinutes: z
        .number()
        .int('Must be a whole number')
        .min(1, 'Must be at least 1 minute')
        .max(525600, 'Must be at most 1 year (525600 minutes)'),
})

export const getTokensSchema = z.object({
    userId: z.string().min(1, 'userId query parameter is required'),
})
