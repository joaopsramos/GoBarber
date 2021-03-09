import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import getValidationErrors from '../../utils/getValidationErrors'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

import { Container, Content, AnimationContainer, Background } from './styles'
import logo from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

interface SignInFormData {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const { addToast } = useToast()
    const history = useHistory()

    const { signIn } = useAuth()

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({})

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().min(
                        6,
                        'A senha precisa ter no mínimo 6 caracteres',
                    ),
                })

                await schema.validate(data, {
                    abortEarly: false,
                })

                await signIn({ email: data.email, password: data.password })

                history.push('/dashboard')
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err)

                    formRef.current?.setErrors(errors)

                    return
                }

                addToast({
                    type: 'error',
                    title: 'Erro no cadastro',
                    description:
                        'Ocorreu um erro ao fazer seu cadastro, tente novamente.',
                })
            }
        },
        [signIn, addToast, history],
    )

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu login</h1>

                        <Input
                            name="email"
                            placeholder="E-mail"
                            icon={FiMail}
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Senha"
                            icon={FiLock}
                        />

                        <Button type="submit">Entrar</Button>

                        <Link to="/forgot-password">Esqueci minha senha</Link>
                    </Form>

                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    )
}

export default SignIn
