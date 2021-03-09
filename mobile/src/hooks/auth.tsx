import React, {
    createContext,
    useState,
    useCallback,
    useContext,
    useEffect,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api'

interface SignInCredentials {
    email: string
    password: string
}

interface User {
    id: string
    name: string
    email: string
    avatar_url: string
}

interface AuthContextData {
    user: User
    updateUser(user: User): Promise<void>
    signIn(credentials: SignInCredentials): Promise<void>
    signOut(): void
    loading: boolean
}

interface AuthState {
    token: string
    user: User
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStoredData(): Promise<void> {
            const [[, token], [, user]] = await AsyncStorage.multiGet([
                '@GoBarber:token',
                '@GoBarber:user',
            ])

            if (token && user) {
                api.defaults.headers.authorization = `Bearer ${token}`
                setData({ token, user: JSON.parse(user) })
            }

            setLoading(false)
        }

        loadStoredData()
    }, [])

    const updateUser = useCallback(
        async (user: User) => {
            setData({
                token: data.token,
                user,
            })

            await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user))
        },
        [setData, data.token],
    )

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password,
        })

        const { token, user } = response.data

        await AsyncStorage.multiSet([
            ['@GoBarber:token', token],
            ['@GoBarber:user', JSON.stringify(user)],
        ])

        api.defaults.headers.authorization = `Bearer ${token}`

        setData({ token, user })
    }, [])

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user'])

        setData({} as AuthState)
    }, [])

    return (
        <AuthContext.Provider
            value={{ user: data.user, updateUser, signIn, signOut, loading }}
        >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext)

    if (!context)
        throw new Error('useAuth must be used within an AuthContext.Provider')

    return context
}

export { AuthProvider, useAuth }
