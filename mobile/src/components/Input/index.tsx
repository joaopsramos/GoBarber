import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
} from 'react'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'

import { Container, TextInput, Icon } from './styles'

interface InputProps extends TextInputProps {
    name: string
    icon: string
    containerStyle?: object
}

interface InputValueReference {
    value: string
}

interface InputRef {
    focus(): void
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
    { name, icon, containerStyle = {}, ...rest },
    ref,
) => {
    const { fieldName, defaultValue = '', error, registerField } = useField(name)
    const inputElementRef = useRef<any>(null)
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inputValueRef.current.value = value
                inputElementRef.current.setNativeProps({ text: value })
            },
            clearValue() {
                inputValueRef.current.value = ''
                inputElementRef.current.clear()
            },
        })
    }, [fieldName, registerField])

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus()
        },
    }))

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    }, [])

    const handleInputBlur = useCallback(() => {
        setIsFocused(false)

        setIsFilled(!!inputValueRef.current.value)
    }, [])

    return (
        <Container isFocused={isFocused} hasError={!!error} style={containerStyle}>
            <Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : '#666360'} />

            <TextInput
                ref={inputElementRef}
                onChangeText={(value) => {
                    inputValueRef.current.value = value
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                keyboardAppearance="dark"
                placeholderTextColor="#666360"
                {...rest}
            />
        </Container>
    )
}

export default forwardRef(Input)
