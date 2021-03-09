import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter'

import SignUp from '../../pages/SignUp'
import api from '../../services/api'

const mockedHistoryPush = jest.fn()
const mockedToast = jest.fn()

const apiMock = new MockAdapter(api)

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: mockedHistoryPush,
        }),
        Link: ({ children }: { children: React.ReactNode }) => children,
    }
})

jest.mock('../../hooks/toast', () => {
    return {
        useToast: () => ({
            addToast: mockedToast,
        }),
    }
})

describe('Page - SignUp', () => {
    beforeEach(() => {
        mockedHistoryPush.mockClear()
    })

    it('should be able to sign up', async () => {
        const apiResponse = {
            user: {
                id: 'userId',
                name: 'John Doe',
                email: 'johndoe@test.com',
                avatar_url: null,
            },
        }

        apiMock.onPost('users').reply(200, apiResponse)

        const { getByPlaceholderText, getByText } = render(<SignUp />)

        const nameField = getByPlaceholderText('Nome')
        const emailField = getByPlaceholderText('E-mail')
        const passwordField = getByPlaceholderText('Senha')
        const buttonElement = getByText('Cadastrar')

        fireEvent.change(nameField, { target: { value: 'John Doe' } })
        fireEvent.change(emailField, { target: { value: 'johndoe@test.com' } })
        fireEvent.change(passwordField, { target: { value: '123456' } })

        fireEvent.click(buttonElement)

        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/')
        })
    })

    it('should not be able to sign up with invalid credentials', async () => {
        const apiResponse = {
            user: {
                id: 'userId',
                name: 'John Doe',
                email: 'invalid-email',
                avatar_url: null,
            },
        }

        apiMock.onPost('users').reply(200, apiResponse)

        const { getByPlaceholderText, getByText } = render(<SignUp />)

        const nameField = getByPlaceholderText('Nome')
        const emailField = getByPlaceholderText('E-mail')
        const passwordField = getByPlaceholderText('Senha')
        const buttonElement = getByText('Cadastrar')

        fireEvent.change(nameField, { target: { value: 'John Doe' } })
        fireEvent.change(emailField, { target: { value: 'invalid-email' } })
        fireEvent.change(passwordField, { target: { value: '123456' } })

        fireEvent.click(buttonElement)

        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled()
        })
    })

    it('should not be able to sign up if an error occurred', async () => {
        apiMock.onPost('users').reply(400, () => {
            throw new Error()
        })

        const { getByPlaceholderText, getByText } = render(<SignUp />)

        const nameField = getByPlaceholderText('Nome')
        const emailField = getByPlaceholderText('E-mail')
        const passwordField = getByPlaceholderText('Senha')
        const buttonElement = getByText('Cadastrar')

        fireEvent.change(nameField, { target: { value: 'John Doe' } })
        fireEvent.change(emailField, { target: { value: 'johndoe@test.com' } })
        fireEvent.change(passwordField, { target: { value: '123456' } })

        fireEvent.click(buttonElement)

        await waitFor(() => {
            expect(mockedToast).toHaveBeenCalledWith(
                expect.objectContaining({ type: 'error' }),
            )
        })
    })
})
