'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { searchTokens } from './utils'
import { getTokensSchema } from '@/lib/schemas'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field'
import ListTokens from './ListTokens'
import { SearchIcon, Loader2Icon } from 'lucide-react'
import ErrorMessage from '../ErrorMessage'

import { type GetTokens } from '@/lib/types'

export default function SearchTokens() {
    const form = useForm<GetTokens>({
        resolver: zodResolver(getTokensSchema),
        defaultValues: {
            userId: '',
        },
    })

    const mutation = useMutation({
        mutationFn: searchTokens,
    })

    const onSubmit = (data: GetTokens) => {
        mutation.mutate(data.userId)
    }

    const tokens = mutation.data ?? []

    return (
        <section className="cyber-card-magenta p-6">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center glow-magenta-sm">
                    <SearchIcon className="w-6 h-6 text-accent" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-foreground">
                        List Tokens
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Search tokens by user ID
                    </p>
                </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="gap-5">
                    <Controller
                        name="userId"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="search-token-userId">
                                    User ID
                                    <span className="text-error"> *</span>
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="search-token-userId"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="e.g., user_123"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={mutation.isPending}
                        size="lg"
                        className="w-full mt-2 gradient-magenta text-accent-foreground font-semibold hover-glow-magenta cyber-btn hover:cursor-pointer"
                    >
                        {mutation.isPending ? (
                            <>
                                <Loader2Icon className="animate-spin" />
                                <span>Searching...</span>
                            </>
                        ) : (
                            <>
                                <SearchIcon className="w-5 h-5" />
                                <span>Search Tokens</span>
                            </>
                        )}
                    </Button>
                </FieldGroup>
            </form>

            {mutation.isError && (
                <ErrorMessage message={mutation.error.message} />
            )}

            <div className="mt-6">
                <ListTokens tokens={tokens} />
            </div>
        </section>
    )
}
