'use client'

import { useState } from 'react'
import {
    EyeIcon,
    EyeOffIcon,
    CopyIcon,
    CheckIcon,
    ClockIcon,
    CalendarIcon,
} from 'lucide-react'

import type { Token } from '@/lib/types'
import moment from 'moment'

type TokenCardProps = {
    token: Token
}

export default function TokenCard({ token }: TokenCardProps) {
    const [showToken, setShowToken] = useState(false)
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="bg-background/60 border border-border hover:border-primary/30 rounded-xl p-4 space-y-4 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.05)]">
            <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-sm text-primary truncate">
                    {token.id}
                </span>

                <div className="flex gap-1.5 flex-wrap justify-end">
                    {token.scopes.map((scope) => (
                        <span
                            key={scope}
                            className="px-2.5 py-1 text-xs bg-accent/10 text-accent border border-accent/20 rounded-md font-medium tracking-wide uppercase"
                        >
                            {scope}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                    <input
                        type={showToken ? 'text' : 'password'}
                        value={token.token}
                        readOnly
                        className="w-full px-4 py-2.5 bg-background/80 border border-border rounded-lg font-mono text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                </div>

                <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="p-2.5 text-muted hover:text-primary bg-background/50 border border-border hover:border-primary/30 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                    title={showToken ? 'Hide token' : 'Show token'}
                >
                    {showToken ? (
                        <EyeOffIcon className="w-4 h-4" />
                    ) : (
                        <EyeIcon className="w-4 h-4" />
                    )}
                </button>

                <button
                    type="button"
                    onClick={() => copyToClipboard(token.token)}
                    className="p-2.5 text-muted hover:text-primary bg-background/50 border border-border hover:border-primary/30 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                    title="Copy token"
                >
                    {copied ? (
                        <CheckIcon className="w-4 h-4 text-success" />
                    ) : (
                        <CopyIcon className="w-4 h-4" />
                    )}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
                <div className="flex items-start gap-2">
                    <CalendarIcon className="w-4 h-4 text-muted mt-0.5" />
                    <div>
                        <span className="text-xs text-muted block">
                            Created
                        </span>
                        <p className="text-sm text-foreground font-mono">
                            {moment(token.createdAt).fromNow()}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <ClockIcon className="w-4 h-4 text-muted mt-0.5" />
                    <div>
                        <span className="text-xs text-muted block">
                            Expires
                        </span>
                        <p className="text-sm text-foreground font-mono">
                            {moment(token.expiresAt).fromNow()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
