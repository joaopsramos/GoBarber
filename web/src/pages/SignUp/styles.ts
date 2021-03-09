import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

import SignUpBackground from '../../assets/sign-up-background.png'

export const Container = styled.div`
    display: flex;
    align-items: stretch;

    height: 100vh;
`

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* place-content: center; */

    width: 100%;
    max-width: 700px;
`

const appearFromRight = keyframes`
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    animation: ${appearFromRight} 1s;

    form {
        width: 340px;
        margin: 80px 0;
        text-align: center;

        h1 {
            margin-bottom: 24px;
        }
    }

    a {
        display: flex;
        align-items: center;

        margin-top: 24px;
        color: var(--light-gray);

        transition: all 0.2s;

        &:hover {
            color: ${shade(0.2, '#f4ede8')};
        }

        svg {
            margin-right: 8px;
        }
    }
`

export const Background = styled.div`
    flex: 1;
    background: url(${SignUpBackground}) no-repeat center;
    background-size: cover;
`
