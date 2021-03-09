import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;

    header {
        width: 100%;
        min-height: 144px;
        background: #28262e;

        display: flex;
        align-items: center;

        div {
            width: 100%;
            max-width: 1120px;
            margin: 0 auto;

            svg {
                width: 24px;
                height: 24px;
                color: #999591;
            }
        }
    }

    form {
        width: 340px;
        margin-top: -93px;
        text-align: center;
        display: flex;
        flex-direction: column;

        h1 {
            margin-bottom: 24px;
            font-size: 20px;
            text-align: left;
        }

        > div:nth-child(5) {
            margin-top: 24px;
        }
    }
`

export const AvatarInput = styled.div`
    margin-bottom: 32px;
    align-self: center;
    position: relative;

    img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
    }

    label {
        width: 48px;
        height: 48px;

        background: var(--secondary);
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        position: absolute;
        right: 0;
        bottom: 0;

        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background: ${shade(0.2, '#ff9000')};
        }

        input {
            display: none;
        }

        svg {
            width: 20px;
            height: 20px;
            color: var(--primary);
        }
    }
`
