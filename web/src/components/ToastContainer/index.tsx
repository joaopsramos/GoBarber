import React from 'react'
import { useTransition } from 'react-spring'

import { Container } from './styles'

import { ToastProps } from '../../hooks/toast'

import Toast from './Toast'

interface ToastContainerProps {
    toasts: ToastProps[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
    const toastsWithTransitions = useTransition(toasts, (toast) => toast.id, {
        from: { right: '-120%', opacity: 0 },
        enter: { right: '0%', opacity: 1 },
        leave: { right: '-120%', opacity: 0 },
    })

    return (
        <Container>
            {toastsWithTransitions.map(({ item: toast, key, props }) => (
                <Toast key={key} toast={toast} style={props} />
            ))}
        </Container>
    )
}

export default ToastContainer
