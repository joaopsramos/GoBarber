import React from 'react'

import { Container } from './styles'

interface TooltipProps {
    description: string
    className?: string
}

const Tooltip: React.FC<TooltipProps> = ({
    description,
    className,
    children,
}) => (
    <Container className={className}>
        <span>{description}</span>
        {children}
    </Container>
)

export default Tooltip
