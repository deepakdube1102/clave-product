import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'
import { useToastStore } from '@/store/toastStore'
import type { Toast as ToastData, ToastVariant } from '@/store/toastStore'

const icons: Record<ToastVariant, { icon: LucideIcon; color: string }> = {
  success: { icon: CheckCircle2, color: 'text-success' },
  error: { icon: XCircle, color: 'text-error' },
  warning: { icon: AlertTriangle, color: 'text-warning' },
  info: { icon: Info, color: 'text-info' },
}

export function Toast({ toast, onDismiss }: { toast: ToastData; onDismiss: () => void }) {
  const { icon: Icon, color } = icons[toast.variant]

  return (
    <div
      role={toast.variant === 'error' ? 'alert' : 'status'}
      className="pointer-events-auto flex w-full items-start gap-3 rounded-default border border-border bg-surface p-4 shadow-popover sm:w-96"
    >
      <Icon className={`mt-0.5 size-5 shrink-0 ${color}`} aria-hidden />
      <div className="flex-1">
        <p className="text-sm font-medium text-text">{toast.title}</p>
        {toast.description && <p className="mt-0.5 text-sm text-secondary">{toast.description}</p>}
      </div>
      <IconButton label="Dismiss notification" size="sm" onClick={onDismiss} className="-my-1 -mr-2">
        <X className="size-4" aria-hidden />
      </IconButton>
    </div>
  )
}

/** Mount once at the app root. */
export function Toaster() {
  const toasts = useToastStore((state) => state.toasts)
  const dismiss = useToastStore((state) => state.dismiss)

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-center gap-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end">
      {toasts.map((item) => (
        <Toast key={item.id} toast={item} onDismiss={() => dismiss(item.id)} />
      ))}
    </div>
  )
}
