import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    InputHTMLAttributes,
} from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'

import { Container, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    const {
        fieldName,
        defaultValue,
        error,
        registerField,
        clearError,
    } = useField(name)

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        })
    }, [fieldName, registerField])

    const handleContainerClick = useCallback(
        () => inputRef.current?.focus(),
        [],
    )

    const handleInputFocus = useCallback(() => setIsFocused(true), [])

    const handleInputBlur = useCallback(() => {
        setIsFocused(false)
        clearError()
        setIsFilled(!!inputRef.current?.value)
    }, [clearError])

    return (
        <Container
            onClick={handleContainerClick}
            hasError={!!error}
            isFocused={isFocused}
            isFilled={isFilled}
            data-testid="input-container"
        >
            {Icon && <Icon size={20} />}
            <input
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                ref={inputRef}
                {...rest}
            />

            {error && (
                <Error description={error}>
                    <FiAlertCircle size={20} color="#c53030" />
                </Error>
            )}
        </Container>
    )
}

export default Input
