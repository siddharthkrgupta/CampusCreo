import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, AlertTriangle, X } from 'lucide-react'
import { cn } from '../../lib/utils'

const ToastContext = createContext({ push: () => { }, dismiss: () => { } })

let idCounter = 0

const TOAST_ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: AlertCircle,
  default: null
}

const TOAST_STYLES = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-red-200 bg-red-50 text-red-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  info: 'border-blue-200 bg-blue-50 text-blue-900',
  default: 'border-slate-200 bg-white text-slate-900'
}

const ICON_STYLES = {
  success: 'text-emerald-600',
  error: 'text-red-600',
  warning: 'text-amber-600',
  info: 'text-blue-600',
  default: 'text-slate-600'
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const push = useCallback((toast) => {
    const id = ++idCounter
    const full = {
      id,
      duration: 4000,
      variant: 'default',
      dismissible: true,
      ...toast
    }
    setToasts(prev => [...prev, full])

    if (full.duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, full.duration)
    }
  }, [])

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 pointer-events-none">
        <AnimatePresence initial={false}>
          {toasts.map(toast => {
            const Icon = TOAST_ICONS[toast.variant]
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  mass: 1
                }}
                className={cn(
                  'px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm',
                  'flex items-start gap-3 w-80 pointer-events-auto',
                  'hover:shadow-xl transition-shadow duration-200',
                  TOAST_STYLES[toast.variant] || TOAST_STYLES.default
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      'h-5 w-5 mt-0.5 flex-shrink-0',
                      ICON_STYLES[toast.variant] || ICON_STYLES.default
                    )}
                  />
                )}
                <div className="flex-1 min-w-0">
                  {toast.title && (
                    <p className="font-semibold text-sm mb-1 truncate">
                      {toast.title}
                    </p>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {toast.message}
                  </p>
                </div>
                {toast.dismissible && (
                  <button
                    onClick={() => dismiss(toast.id)}
                    className="text-current opacity-70 hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-black/5"
                    aria-label="Dismiss notification"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}
