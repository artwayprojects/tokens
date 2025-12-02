'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createTokenSchema } from '@/lib/schemas'
import { createToken } from './utils'

import ErrorMessage from '@/app/components/ErrorMessage'
import TokenCard from '@/app/components/TokenCard'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { PlusIcon, Loader2Icon, CheckCircleIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { UserIdField } from './UserIdField'
import { ScopesField } from './ScopesField'
import { ExpiresField } from './ExpiresField'

import { type CreateToken } from '@/lib/types'

export default function CreateToken() {
    const form = useForm<CreateToken>({
        resolver: zodResolver(createTokenSchema),
        defaultValues: {
            userId: '',
            scopes: [],
            expiresInMinutes: 60,
        },
    })

    const mutation = useMutation({
        mutationFn: createToken,
        onSuccess: () => {
            form.reset()
        },
    })

    const onSubmit = (data: CreateToken) => {
        mutation.mutate({
            userId: data.userId,
            scopes: data.scopes,
            expiresInMinutes: data.expiresInMinutes,
        })
    }

    return (
        <div>
            <section className="bg-card rounded-2xl border border-border p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <PlusIcon className="w-5 h-5 text-primary" />
                    </div>

                    <h2 className="text-xl font-semibold">Create Token</h2>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-5">
                        <Controller
                            name="userId"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <UserIdField
                                    field={field}
                                    fieldState={fieldState}
                                />
                            )}
                        />

                        <Controller
                            name="scopes"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <ScopesField
                                    field={field}
                                    fieldState={fieldState}
                                />
                            )}
                        />

                        <Controller
                            name="expiresInMinutes"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <ExpiresField
                                    field={field}
                                    fieldState={fieldState}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            size="lg"
                            className="w-full mt-2 gradient-cyan text-primary-foreground font-semibold hover-glow-cyan cyber-btn hover:cursor-pointer"
                        >
                            {mutation.isPending ? (
                                <>
                                    <Loader2Icon className="animate-spin" />
                                    <span>Creating...</span>
                                </>
                            ) : (
                                <>
                                    <PlusIcon className="w-5 h-5" />
                                    <span>Create Token</span>
                                </>
                            )}
                        </Button>
                    </FieldGroup>
                </form>

                {mutation.isError && (
                    <ErrorMessage message={mutation.error.message} />
                )}
            </section>

            {mutation.isSuccess && mutation.data && (
                <div className="mt-6 p-4 bg-success-muted border border-success/30 rounded-xl glow-green">
                    <div className="flex items-center gap-2 text-success text-sm font-medium mb-3">
                        <CheckCircleIcon className="w-5 h-5" />

                        <span>Token created successfully!</span>
                    </div>

                    <TokenCard token={mutation.data} />
                </div>
            )}
        </div>
    )
}
