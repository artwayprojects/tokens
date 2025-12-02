import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import type { CreateToken } from '@/lib/types'

import type { ControllerRenderProps } from 'react-hook-form'

type UserIdFieldProps = {
    field: ControllerRenderProps<CreateToken, 'userId'>
    fieldState: {
        invalid: boolean
        error?: { message?: string }
    }
}

export function UserIdField({ field, fieldState }: UserIdFieldProps) {
    return (
        <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="create-token-userId">
                User ID
                <span className="text-error"> *</span>
            </FieldLabel>
            <Input
                {...field}
                id="create-token-userId"
                aria-invalid={fieldState.invalid}
                placeholder="e.g., user_123"
                autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    )
}
