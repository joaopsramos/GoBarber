import React, { useRef, useCallback } from 'react'
import ImagePicker from 'react-native-image-picker'
import {
    View,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Alert,
    TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/auth'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'

import {
    Container,
    BackButton,
    UserAvatarButton,
    UserAvatar,
    Title,
} from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

interface ProfileFormData {
    name: string
    email: string
    old_password: string
    password: string
    password_confirmation: string
}

const Profile: React.FC = () => {
    const { user, updateUser } = useAuth()

    const emailInputRef = useRef<TextInput>(null)
    const oldPasswordInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)
    const passwordConfirmationInputRef = useRef<TextInput>(null)

    const formRef = useRef<FormHandles>(null)
    const navigation = useNavigation()

    const handleSubmit = useCallback(
        async (data: ProfileFormData) => {
            try {
                formRef.current?.setErrors({})

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                    old_password: Yup.string(),
                    password: Yup.string().when('old_password', {
                        is: (value) => !!value.length,
                        then: Yup.string().min(
                            6,
                            'A senha precisa ter no mínimo 6 caracteres',
                        ),
                        otherwise: Yup.string(),
                    }),
                    password_confirmation: Yup.string()
                        .when('old_password', {
                            is: (value) => !!value.length,
                            then: Yup.string().min(
                                6,
                                'A senha precisa ter no mínimo 6 caracteres',
                            ),
                            otherwise: Yup.string().notRequired(),
                        })
                        .oneOf(
                            [Yup.ref('password'), undefined],
                            'As senhas precisam ser iguais',
                        ),
                })

                await schema.validate(data, {
                    abortEarly: false,
                })

                const {
                    name,
                    email,
                    old_password,
                    password,
                    password_confirmation,
                } = data

                const formData = {
                    name,
                    email,
                    ...(data.old_password
                        ? {
                              old_password,
                              password,
                              password_confirmation,
                          }
                        : {}),
                }

                const response = await api.put('/profile', formData)

                updateUser(response.data)

                Alert.alert('Perfil atualizado com sucesso')

                navigation.goBack()
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err)

                    formRef.current?.setErrors(errors)

                    return
                }

                Alert.alert(
                    'Erro na atualização',
                    'Ocorreu um erro ao atualizar seu cadastro, tente novamente.',
                )
            }
        },
        [navigation, updateUser],
    )

    const handleUpdateAvatar = useCallback(() => {
        ImagePicker.showImagePicker(
            {
                title: 'Selecione um avatar',
                cancelButtonTitle: 'Cancelar',
                takePhotoButtonTitle: 'User câmera',
                chooseFromLibraryButtonTitle: 'Escolher da galeria',
            },
            (response) => {
                if (response.didCancel) return

                if (response.error) {
                    Alert.alert('Erro ao atualizar seu avatar.')
                    return
                }

                const { type, fileName, uri } = response

                const data = new FormData()

                data.append('avatar', {
                    type,
                    name: fileName,
                    uri,
                })

                api.patch('users/avatar', data).then((apiResponse) => {
                    updateUser(apiResponse.data)
                })
            },
        )
    }, [updateUser])

    const handleGoBack = useCallback(() => {
        navigation.goBack()
    }, [navigation])

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
                        <BackButton onPress={handleGoBack}>
                            <Icon
                                name="chevron-left"
                                size={24}
                                color="#999591"
                            />
                        </BackButton>

                        <UserAvatarButton onPress={handleUpdateAvatar}>
                            <UserAvatar source={{ uri: user.avatar_url }} />
                        </UserAvatarButton>

                        <View>
                            <Title>Meu perfil</Title>
                        </View>

                        <Form
                            ref={formRef}
                            initialData={user}
                            onSubmit={handleSubmit}
                        >
                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="Name"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus()
                                }}
                            />
                            <Input
                                ref={emailInputRef}
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    oldPasswordInputRef.current?.focus()
                                }}
                            />
                            <Input
                                ref={oldPasswordInputRef}
                                name="old_password"
                                icon="lock"
                                placeholder="Senha atual"
                                secureTextEntry
                                textContentType="newPassword"
                                returnKeyType="next"
                                containerStyle={{ marginTop: 16 }}
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus()
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Nova senha"
                                secureTextEntry
                                textContentType="newPassword"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordConfirmationInputRef.current?.focus()
                                }}
                            />
                            <Input
                                ref={passwordConfirmationInputRef}
                                name="password_confirmation"
                                icon="lock"
                                placeholder="Confirmar nova senha"
                                secureTextEntry
                                textContentType="newPassword"
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
                                Confirmar mudanças
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}

export default Profile
