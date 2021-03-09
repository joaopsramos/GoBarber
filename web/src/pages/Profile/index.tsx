import React, { useCallback, useRef, ChangeEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FiUser, FiMail, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import { useToast } from '../../hooks/toast'
import { useAuth } from '../../hooks/auth'

import getValidationErrors from '../../utils/getValidationErrors'

import { Container, AvatarInput } from './styles'

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
    const formRef = useRef<FormHandles>(null)
    const { addToast } = useToast()
    const history = useHistory()

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

                history.push('/')

                addToast({
                    type: 'success',
                    title: 'Perfil atualizado!',
                })
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err)

                    formRef.current?.setErrors(errors)

                    return
                }

                addToast({
                    type: 'error',
                    title: 'Erro na atualização',
                    description:
                        'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
                })
            }
        },
        [addToast, history, updateUser],
    )

    const handleAvatarChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return

            const data = new FormData()

            data.append('avatar', e.target.files[0])

            api.patch('users/avatar', data).then((response) => {
                updateUser(response.data)

                addToast({
                    type: 'success',
                    title: 'Avatar atualizado!',
                })
            })
        },
        [updateUser, addToast],
    )

    return (
        <Container>
            <header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>

            <Form
                ref={formRef}
                initialData={{
                    name: user.name,
                    email: user.email,
                }}
                onSubmit={handleSubmit}
            >
                <AvatarInput>
                    <img src={user.avatar_url} alt={user.name} />
                    <label htmlFor="avatar">
                        <FiCamera />
                        <input
                            type="file"
                            id="avatar"
                            onChange={handleAvatarChange}
                        />
                    </label>
                </AvatarInput>

                <h1>Meu perfil</h1>

                <Input name="name" placeholder="Name" icon={FiUser} />
                <Input name="email" placeholder="E-mail" icon={FiMail} />

                <Input
                    type="password"
                    name="old_password"
                    placeholder="Senha atual"
                    icon={FiLock}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Nova senha"
                    icon={FiLock}
                />
                <Input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirmar senha"
                    icon={FiLock}
                />

                <Button type="submit">Confirmar mudanças</Button>
            </Form>
        </Container>
    )
}

export default Profile
