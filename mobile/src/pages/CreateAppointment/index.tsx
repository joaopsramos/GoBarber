import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Platform, ScrollView, Alert } from 'react-native'
import { format } from 'date-fns'

import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import {
    Container,
    Header,
    ProfileButton,
    HeaderTitle,
    UserAvatar,
    ProvidersListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    Calendar,
    Title,
    OpenDatePickerButton,
    OpenDatePickerButtonText,
    Schedule,
    Section,
    SectionTitle,
    SectionContent,
    Hour,
    HourText,
    CreateAppointmentButton,
    CreateAppointmentButtonText,
} from './styles'

interface RouteParams {
    providerId: string
}

export interface Provider {
    id: string
    name: string
    avatar_url: string
}

interface AvailabilityItem {
    hour: number
    available: boolean
}

const CreateAppointment: React.FC = () => {
    const { user } = useAuth()
    const route = useRoute()
    const { navigate, goBack } = useNavigation()
    const routeParams = route.params as RouteParams

    const [availability, setAvailability] = useState<AvailabilityItem[]>([])
    const [providers, setProviders] = useState<Provider[]>([])
    const [selectedProvider, setSelectedProvider] = useState(
        routeParams.providerId,
    )
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedHour, setSelectedHour] = useState(0)

    useEffect(() => {
        api.get('providers').then((response) => {
            setProviders(response.data)
        })
    }, [])

    useEffect(() => {
        api.get(`providers/${selectedProvider}/day-availability`, {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            },
        }).then((response) => {
            setAvailability(response.data)
        })
    }, [selectedProvider, selectedDate, setAvailability])

    useEffect(() => {
        setSelectedHour(0)
    }, [selectedDate])

    const navigateBack = useCallback(() => {
        goBack()
    }, [goBack])

    const handleSelectProvider = useCallback((providerId: string) => {
        setSelectedProvider(providerId)
    }, [])

    const handleToggleDatePicker = useCallback(() => {
        setShowDatePicker((state) => !state)
    }, [])

    const handleDateChange = useCallback(
        (event: any, date: Date | undefined) => {
            if (Platform.OS === 'android') setShowDatePicker(false)

            if (date) setSelectedDate(date)
        },
        [setSelectedDate],
    )

    const handleSelectHour = useCallback((hour: number) => {
        setSelectedHour(hour)
    }, [])

    const handleCreateAppointment = useCallback(async () => {
        try {
            const date = new Date(selectedDate)

            date.setHours(selectedHour)
            date.setMinutes(0)

            await api.post('appointments', {
                provider_id: selectedProvider,
                date,
            })

            navigate('AppointmentCreated', { date: date.getTime() })
        } catch (err) {
            Alert.alert(
                'Erro ao criar o agendamento',
                'Ocorreu um erro ao tentar criar o agendamento, tente novamente',
            )
        }
    }, [navigate, selectedDate, selectedHour, selectedProvider])

    const navigateToProfile = useCallback(() => {
        navigate('Profile')
    }, [navigate])

    const morningAvailability = useMemo(() => {
        return availability
            .filter(({ hour }) => hour < 12)
            .map(({ hour, available }) => ({
                hour,
                available,
                formattedHour: format(new Date().setHours(hour), 'HH:00'),
            }))
    }, [availability])

    const afternoonAvailability = useMemo(() => {
        return availability
            .filter(({ hour }) => hour >= 12)
            .map(({ hour, available }) => ({
                hour,
                available,
                formattedHour: format(new Date().setHours(hour), 'HH:00'),
            }))
    }, [availability])

    return (
        <Container>
            <Header>
                <TouchableOpacity onPress={navigateBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </TouchableOpacity>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <ProfileButton onPress={navigateToProfile}>
                    <UserAvatar source={{ uri: user.avatar_url }} />
                </ProfileButton>
            </Header>

            <ScrollView>
                <ProvidersListContainer>
                    <ProvidersList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={providers}
                        keyExtractor={(provider) => provider.id}
                        renderItem={({ item: provider }) => (
                            <ProviderContainer
                                onPress={() =>
                                    handleSelectProvider(provider.id)
                                }
                                selected={provider.id === selectedProvider}
                            >
                                <ProviderAvatar
                                    source={{ uri: provider.avatar_url }}
                                />
                                <ProviderName
                                    selected={provider.id === selectedProvider}
                                >
                                    {provider.name}
                                </ProviderName>
                            </ProviderContainer>
                        )}
                    />
                </ProvidersListContainer>

                <Calendar>
                    <Title>Escolha a data</Title>

                    <OpenDatePickerButton onPress={handleToggleDatePicker}>
                        <OpenDatePickerButtonText>
                            Selecionar ourta data
                        </OpenDatePickerButtonText>
                    </OpenDatePickerButton>

                    {showDatePicker && (
                        <DateTimePicker
                            onChange={handleDateChange}
                            mode="date"
                            display="calendar"
                            textColor="#f4ede8"
                            value={selectedDate}
                        />
                    )}
                </Calendar>

                <Schedule>
                    <Title>Escolha o horário</Title>

                    <Section>
                        <SectionTitle>Manhã</SectionTitle>

                        <SectionContent>
                            {morningAvailability.map(
                                ({ hour, available, formattedHour }) => (
                                    <Hour
                                        key={formattedHour}
                                        enabled={available}
                                        selected={selectedHour === hour}
                                        available={available}
                                        onPress={() => handleSelectHour(hour)}
                                    >
                                        <HourText
                                            selected={selectedHour === hour}
                                        >
                                            {formattedHour}
                                        </HourText>
                                    </Hour>
                                ),
                            )}
                        </SectionContent>
                    </Section>

                    <Section>
                        <SectionTitle>Tarde</SectionTitle>

                        <SectionContent>
                            {afternoonAvailability.map(
                                ({ hour, available, formattedHour }) => (
                                    <Hour
                                        key={formattedHour}
                                        enabled={available}
                                        selected={selectedHour === hour}
                                        available={available}
                                        onPress={() => handleSelectHour(hour)}
                                    >
                                        <HourText
                                            selected={selectedHour === hour}
                                        >
                                            {formattedHour}
                                        </HourText>
                                    </Hour>
                                ),
                            )}
                        </SectionContent>
                    </Section>
                </Schedule>

                <CreateAppointmentButton onPress={handleCreateAppointment}>
                    <CreateAppointmentButtonText>
                        Agendar
                    </CreateAppointmentButtonText>
                </CreateAppointmentButton>
            </ScrollView>
        </Container>
    )
}

export default CreateAppointment
