import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field'

import { VALID_SCOPES } from '@/lib/data'

import type { CreateToken } from '@/lib/types'
import type { ControllerRenderProps } from 'react-hook-form'

type ScopesFieldProps = {
    field: ControllerRenderProps<CreateToken, 'scopes'>
    fieldState: {
        invalid: boolean
        error?: { message?: string }
    }
}

export function ScopesField({ field, fieldState }: ScopesFieldProps) {
    return (
        <Field data-invalid={fieldState.invalid}>
            <FieldLabel>
                Scopes <span className="text-error">*</span>
            </FieldLabel>

            <div className="flex flex-wrap gap-2">
                {VALID_SCOPES.map((scope) => {
                    const isChecked = field.value?.includes(scope) ?? false
                    return (
                        <Label
                            key={scope}
                            className={cn(
                                'flex items-center gap-2 cursor-pointer',
                                'px-2.5 py-1 rounded-md border',
                                'text-xs font-medium tracking-wide uppercase',
                                isChecked
                                    ? 'bg-primary/10 text-primary border-primary/30'
                                    : 'bg-accent/10 text-accent border-accent/20 hover:border-primary/30 hover:bg-primary/5'
                            )}
                        >
                            <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                    const scopes = field.value ?? []
                                    field.onChange(
                                        checked
                                            ? [...scopes, scope]
                                            : scopes.filter((s) => s !== scope)
                                    )
                                }}
                            />
                            <span>{scope}</span>
                        </Label>
                    )
                })}
            </div>

            <FieldDescription>
                Select one or more permission scopes
            </FieldDescription>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )
}
