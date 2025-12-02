import { KeyIcon } from 'lucide-react'
import TokenCard from '@/app/components/TokenCard'

import { type Token } from '@/lib/types'

type ListTokensProps = {
    tokens: Token[]
}
export default function ListTokens({ tokens }: ListTokensProps) {
    if (tokens.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed border-border rounded-xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/10 flex items-center justify-center">
                    <KeyIcon className="w-8 h-8 text-muted" />
                </div>

                <p className="text-muted-foreground font-medium">
                    No active tokens found
                </p>

                <p className="text-muted text-sm mt-1">
                    This user has no tokens yet
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Found{' '}
                    <span className="text-accent font-semibold">
                        {tokens.length}
                    </span>{' '}
                    active token{tokens.length !== 1 ? 's' : ''}
                </p>

                <div className="h-px flex-1 ml-4 bg-gradient-to-r from-accent/30 to-transparent" />
            </div>

            <div className="space-y-3">
                {tokens.map((token) => (
                    <TokenCard key={token.id} token={token} />
                ))}
            </div>
        </div>
    )
}
