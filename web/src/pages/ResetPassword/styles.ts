import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'

import SignInBackground from '../../assets/sign-in-background.png'

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

const appearFromLeft = keyframes`
    from {
        opacity: 0;
        transform: translateX(-50px);
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

    animation: ${appearFromLeft} 1s;

    form {
        width: 340px;
        margin: 80px 0;
        text-align: center;

        h1 {
            margin-bottom: 24px;
        }

        a {
            display: block;
            margin-top: 24px;
            color: var(--light-gray);

            transition: all 0.2s;

            &:hover {
                color: ${shade(0.2, '#f4ede8')};
            }
        }
    }

    a {
        display: flex;
        align-items: center;

        margin-top: 24px;
        color: var(--secondary);

        transition: all 0.2s;

        &:hover {
            color: ${shade(0.2, '#ff9000')};
        }

        svg {
            margin-right: 8px;
        }
    }
`

export const Background = styled.div`
    flex: 1;
    background: url(${SignInBackground}) no-repeat center;
    background-size: cover;
`
