import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import Input from '../../components/Input'

jest.mock('@unform/core', () => {
    return {
        useField: () => ({
            fieldName: 'E-mail',
            defaultValue: '',
            error: '',
            registerField: jest.fn(),
            clearError: jest.fn(),
        }),
    }
})

describe('Component - Input', () => {
    it('should be able to render the input', () => {
        const { getByPlaceholderText } = render(
            <Input name="email" placeholder="E-mail" />,
        )

        expect(getByPlaceholderText('E-mail')).toBeTruthy()
    })

    it('should render highlight on input focus and lose it on blur', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <Input name="email" placeholder="E-mail" />,
        )

        const inputElement = getByPlaceholderText('E-mail')
        const containerElement = getByTestId('input-container')

        fireEvent.focus(inputElement)

        await waitFor(() => {
            expect(containerElement).toHaveStyle(
                'border-color: var(--secondary);',
            )
            expect(containerElement).toHaveStyle('color: var(--secondary);')
        })

        fireEvent.blur(inputElement)

        await waitFor(() => {
            expect(containerElement).toHaveStyle(
                'border-color: var(--tertiary);',
            )
            expect(containerElement).toHaveStyle('color: var(--tertiary);')
        })
    })

    it('should focus input on container click', async () => {
        const { getByTestId } = render(
            <Input name="email" placeholder="E-mail" />,
        )

        const containerElement = getByTestId('input-container')

        fireEvent.click(containerElement)

        await waitFor(() => {
            expect(containerElement).toHaveStyle(
                'border-color: var(--secondary);',
            )
            expect(containerElement).toHaveStyle('color: var(--secondary);')
        })
    })

    it('should keep render highlight when input has value', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <Input name="email" placeholder="E-mail" />,
        )

        const inputElement = getByPlaceholderText('E-mail')
        const containerElement = getByTestId('input-container')

        fireEvent.change(inputElement, {
            target: { value: 'johndoe@test.com' },
        })

        fireEvent.blur(inputElement)

        await waitFor(() => {
            expect(containerElement).toHaveStyle('color: #ff9000;')
        })
    })
})
