import { AlertCircleIcon } from 'lucide-react'

type ErrorMessageProps = {
    message: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className="mt-6 p-4 bg-error-muted border border-error/30 rounded-xl glow-pink">
            <div className="flex items-start gap-3">
                <AlertCircleIcon className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-medium text-error">Error</p>
                    <p className="text-sm text-foreground/80 mt-1">{message}</p>
                </div>
            </div>
        </div>
    )
}
