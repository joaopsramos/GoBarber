import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
    padding: 0 24px;
    flex: 1;
    justify-content: center;
    align-items: center;
`
export const Title = styled.Text`
    margin-top: 32px;
    color: #f4ede8;
    text-align: center;
    font-size: 32px;
    font-family: 'RobotoSlab-Medium';
`

export const Description = styled.Text`
    text-align: center;
    margin-top: 16px;
    text-align: center;
    color: #999591;
    font-size: 18px;
    font-family: 'RobotoSlab-Regular';
`

export const OkButton = styled(RectButton)`
    margin-top: 24px;
    padding: 12px 24px;
    border-radius: 10px;
    background: #ff9000;
    justify-content: center;
    align-items: center;
`

export const OkButtonText = styled.Text`
    color: #312e38;
    font-size: 18px;
    font-family: 'RobotoSlab-Medium';
`
