import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RectButton } from 'react-native-gesture-handler'

import { Provider } from './index'

interface ProviderContainerProps {
    selected: boolean
}

interface ProviderNameProps {
    selected: boolean
}

interface HourProps {
    selected: boolean
    available: boolean
}

interface HourTextProps {
    selected: boolean
}

export const Container = styled.View``

export const Header = styled.View`
    padding: 24px;
    padding-top: ${getStatusBarHeight() + 24}px;
    background: #28262e;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const HeaderTitle = styled.Text`
    margin-left: 16px;
    color: #f4ede8;
    font-size: 20px;
    font-family: 'RobotoSlab-Medium';
`

export const ProfileButton = styled.TouchableOpacity`
    margin-left: auto;
`

export const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 28px;
`

export const ProvidersListContainer = styled.View`
    height: 112px;
`

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
    padding: 32px 24px;
`

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
    padding: 8px 12px;
    margin-right: 16px;
    border-radius: 10px;
    background: ${(props) => (props.selected ? '#ff9000' : '#3e3b47')};

    flex-direction: row;
    align-items: center;
`

export const ProviderAvatar = styled.Image`
    width: 32px;
    height: 32px;
    border-radius: 16px;
`

export const ProviderName = styled.Text<ProviderNameProps>`
    margin-left: 8px;
    color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
    font-size: 16px;
    font-family: 'RobotoSlab-Medium';
`

export const Calendar = styled.View``

export const Title = styled.Text`
    margin: 0 24px 24px;
    color: #f4ede8;
    font-size: 24px;
    font-family: 'RobotoSlab-Medium';
`

export const OpenDatePickerButton = styled(RectButton)`
    height: 46px;
    margin: 0 24px;
    background: #ff9000;
    border-radius: 10px;

    align-items: center;
    justify-content: center;
`
export const OpenDatePickerButtonText = styled.Text`
    color: #232129;
    font-size: 16px;
    font-family: 'RobotoSlab-Medium';
`

export const Schedule = styled.View`
    padding: 24px 0 16px;
`

export const Section = styled.View`
    margin-bottom: 24px;
`

export const SectionTitle = styled.Text`
    margin: 0 24px 12px;
    color: #999591;
    font-size: 18px;
    font-family: 'RobotoSlab-Regular';
`

export const SectionContent = styled.ScrollView.attrs({
    horizontal: true,
    contentContainerStyle: { paddingHorizontal: 24 },
    showsHorizontalScrollIndicator: false,
})``

export const Hour = styled(RectButton)<HourProps>`
    padding: 12px;
    background: ${(props) => (props.selected ? '#ff9000' : '#3e3b47')};
    border-radius: 10px;
    margin-right: 8px;

    opacity: ${(props) => (props.available ? 1 : 0.3)};
`

export const HourText = styled.Text<HourTextProps>`
    color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
    font-size: 16px;
    font-family: 'RobotoSlab-Medium';
`

export const CreateAppointmentButton = styled(RectButton)`
    height: 50px;
    margin: 0 24px 24px;
    background: #ff9000;
    border-radius: 10px;

    align-items: center;
    justify-content: center;
`

export const CreateAppointmentButtonText = styled.Text`
    color: #232129;
    font-size: 18px;
    font-family: 'RobotoSlab-Medium';
`
