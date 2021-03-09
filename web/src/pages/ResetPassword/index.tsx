import React, { useCallback, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FiLock } from 'react-icons/fi'

import getValidationErrors from '../../utils/getValidationErrors'

import { useToast } from '../../hooks/toast'
import api from '../../services/api'

import { Container, Content, AnimationContainer, Background } from './styles'
import logo from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

interface ResetPasswordFormData {
    password: string
    password_confirmation: string
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const { addToast } = useToast()

    const location = useLocation()
    const history = useHistory()

    const handleSubmit = useCallback(
        async (data: ResetPasswordFormData) => {
            try {
                formRef.current?.setErrors({})

                const schema = Yup.object().shape({
                    password: Yup.string().min(
                        6,
                        'A senha precisa ter no mínimo 6 caracteres',
                    ),
                    password_confirmation: Yup.string().oneOf(
                        [Yup.ref('password'), undefined],
                        'As senhas precisam ser iguais',
                    ),
                })

                await schema.validate(data, {
                    abortEarly: false,
                })

                const token = location.search.replace('?token=', '')

                if (!token) {
                    throw new Error()
                }

                const { password, password_confirmation } = data

                await api.post('/password/reset', {
                    password,
                    password_confirmation,
                    token,
                })

                addToast({
                    type: 'success',
                    title: 'Sucesso!',
                    description: 'Sua senha foi alterada com sucesso',
                })

                history.push('/')
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err)

                    formRef.current?.setErrors(errors)

                    return
                }

                addToast({
                    type: 'error',
                    title: 'Erro ao resetar senha',
                    description:
                        'Ocorreu um erro ao resetar sua senha, tente novamente.',
                })
            }
        },
        [addToast, history, location],
    )

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Resetar senha</h1>

                        <Input
                            name="password"
                            type="password"
                            placeholder="Nova senha"
                            icon={FiLock}
                        />

                        <Input
                            name="password_confirmation"
                            type="password"
                            placeholder="Confirmação da senha"
                            icon={FiLock}
                        />

                        <Button type="submit">Alterar senha</Button>
                    </Form>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    )
}

export default ResetPassword
