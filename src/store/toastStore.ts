import { create } from 'zustand'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  variant: ToastVariant
  title: string
  description?: string
}

interface ToastState {
  toasts: Toast[]
  show: (toast: Omit<Toast, 'id'>, durationMs?: number) => void
  dismiss: (id: string) => void
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  show: (toast, durationMs = 5000) => {
    const id = crypto.randomUUID()
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))
    setTimeout(() => get().dismiss(id), durationMs)
  },
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}))

const show = (variant: ToastVariant) => (title: string, description?: string) =>
  useToastStore.getState().show({ variant, title, description })

/** Fire toasts from anywhere, including outside React. */
export const toast = {
  success: show('success'),
  error: show('error'),
  warning: show('warning'),
  info: show('info'),
}
