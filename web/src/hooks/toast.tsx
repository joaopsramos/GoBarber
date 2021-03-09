import React, { createContext, useContext, useState, useCallback } from 'react'
import { uuid } from 'uuidv4'

import ToastContainer from '../components/ToastContainer'

interface ToastContextData {
    addToast(toasts: Omit<ToastProps, 'id'>): void
    removeToast(id: string): void
}

export interface ToastProps {
    id: string
    title: string
    description?: string
    type?: 'info' | 'success' | 'error'
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider: React.FC = ({ children }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([])

    const addToast = useCallback(
        ({ title, description, type }: Omit<ToastProps, 'id'>) => {
            const id = uuid()

            const toast = {
                id,
                title,
                description,
                type,
            }

            setToasts((oldToasts) => [...oldToasts, toast])
        },
        [],
    )

    const removeToast = useCallback((id: string) => {
        setToasts((oldToasts) => oldToasts.filter((toast) => toast.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} />
        </ToastContext.Provider>
    )
}

function useToast(): ToastContextData {
    const context = useContext(ToastContext)

    return context
}

export { ToastProvider, useToast }
