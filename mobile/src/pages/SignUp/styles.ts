import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const Container = styled.View`
    padding: 0 30px;

    flex: 1;
    align-items: center;
    justify-content: center;
`

export const Title = styled.Text`
    margin: 64px 0 24px;
    color: #f4ede8;
    font-size: 24px;
    font-family: 'RobotoSlab-Medium';
`

export const ForgotPassword = styled.TouchableOpacity`
    margin-top: 24px;
`

export const ForgotPasswordText = styled.Text`
    color: #f4ede8;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`

export const BackToSignIn = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;

    padding: 16px 0 ${16 + getBottomSpace()}px;
    background: #312e38;
    border-top-width: 1px;
    border-top-color: #232129;

    align-items: center;
    justify-content: center;
    flex-direction: row;
`

export const BackToSignInText = styled.Text`
    margin-left: 8px;
    color: #fff;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`
