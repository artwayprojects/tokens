import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import type { CreateToken } from '@/lib/types'

import type { ControllerRenderProps } from 'react-hook-form'

type ExpiresFieldProps = {
    field: ControllerRenderProps<CreateToken, 'expiresInMinutes'>
    fieldState: {
        invalid: boolean
        error?: { message?: string }
    }
}

export function ExpiresField({ field, fieldState }: ExpiresFieldProps) {
    return (
        <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="create-token-expires">
                Expires In (minutes) <span className="text-error">*</span>
            </FieldLabel>
            <Input
                {...field}
                id="create-token-expires"
                aria-invalid={fieldState.invalid}
                type="number"
                min={1}
                autoComplete="off"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )
}
