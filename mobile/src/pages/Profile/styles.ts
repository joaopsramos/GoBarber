import styled from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const Container = styled.View`
    padding: 0 30px;

    flex: 1;
    justify-content: center;
`

export const BackButton = styled.TouchableOpacity`
    margin-top: 64px;
`

export const UserAvatarButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
    width: 186px;
    height: 186px;
    margin-top: -${getStatusBarHeight() + 12}px;
    border-radius: 98px;
    align-self: center;
`

export const Title = styled.Text`
    margin: 24px 0 24px;
    color: #f4ede8;
    font-size: 20px;
    font-family: 'RobotoSlab-Medium';

    text-align: left;
`
