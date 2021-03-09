import React, { useCallback, useRef } from 'react'
import {
    View,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TextInput,
    Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import HideWithKeyboard from 'react-native-hide-with-keyboard'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText,
} from './styles'
import logoImg from '../../assets/logo.png'

import Input from '../../components/Input'
import Button from '../../components/Button'

interface SignInFormData {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const passwordInputRef = useRef<TextInput>(null)
    const navigation = useNavigation()
    const { signIn, user } = useAuth()

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({})

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
                })

                await schema.validate(data, {
                    abortEarly: false,
                })

                await signIn({ email: data.email, password: data.password })
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err)

                    formRef.current?.setErrors(errors)

                    return
                }

                Alert.alert(
                    'Erro na autenticação',
                    'Ocorreu um erro ao fazer seu logon, tente novamente.',
                )
            }
        },
        [signIn],
    )

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <Container>
                        <Image source={logoImg} />

                        <View>
                            <Title>Faça seu Logon</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <Input
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus()
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm()
                                }}
                            />

                            <Button
                                onPress={() => {
                                    formRef.current?.submitForm()
                                }}
                            >
                                Entrar
                            </Button>
                        </Form>

                        <ForgotPassword onPress={() => {}}>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <HideWithKeyboard>
                <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
                    <Icon name="log-in" size={20} color="#ff9000" />
                    <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
                </CreateAccountButton>
            </HideWithKeyboard>
        </>
    )
}

export default SignIn
