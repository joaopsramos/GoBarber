import React, { useCallback, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FiLogIn, FiMail } from 'react-icons/fi'

import getValidationErrors from '../../utils/getValidationErrors'

import { useToast } from '../../hooks/toast'
import api from '../../services/api'

import { Container, Content, AnimationContainer, Background } from './styles'
import logo from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

interface ForgotPasswordFormData {
    email: string
}

const ForgotPassword: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const formRef = useRef<FormHandles>(null)
    const { addToast } = useToast()
    const history = useHistory()

    const handleSubmit = useCallback(
        async (data: ForgotPasswordFormData) => {
            try {
                setIsLoading(true)

                formRef.current?.setErrors({})

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                })

                await schema.validate(data, {
                    abortEarly: false,
                })

                await api.post('/password/forgot', {
                    email: data.email,
                })

                addToast({
                    type: 'success',
                    title: 'E-mail de recuperação enviado',
                    description:
                        'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
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
                    title: 'Erro na recuperação de senha',
                    description:
                        'Ocorreu um erro ao tentar recuperar a senha, tente novamente.',
                })
            } finally {
                setIsLoading(false)
            }
        },
        [addToast, history],
    )

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recuperar senha</h1>

                        <Input
                            name="email"
                            placeholder="E-mail"
                            icon={FiMail}
                        />

                        <Button loading={isLoading} type="submit">
                            Recuperar
                        </Button>
                    </Form>

                    <Link to="/">
                        <FiLogIn />
                        Fazer login
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    )
}

export default ForgotPassword
