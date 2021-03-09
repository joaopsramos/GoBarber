import React, { useEffect } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'

import { Container } from './styles'

import { ToastProps, useToast } from '../../../hooks/toast'

interface ToastInterface {
    toast: ToastProps
    style: object
}

const icons = {
    info: <FiInfo size={22} />,
    success: <FiCheckCircle size={22} />,
    error: <FiAlertCircle size={22} />,
}

const Toast: React.FC<ToastInterface> = ({ toast, style }) => {
    const { removeToast } = useToast()

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(toast.id)
        }, 4000)

        return () => {
            clearTimeout(timer)
        }
    }, [removeToast, toast.id])

    return (
        <Container
            type={toast.type}
            $hasDescription={!!toast.description}
            style={style}
        >
            {icons[toast.type || 'info']}

            <div>
                <strong>{toast.title}</strong>
                {toast.description && <p>{toast.description}</p>}
            </div>

            <button onClick={() => removeToast(toast.id)} type="button">
                <FiXCircle size={18} />
            </button>
        </Container>
    )
}

export default Toast
