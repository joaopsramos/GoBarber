import styled, { css } from 'styled-components'
import { animated } from 'react-spring'

interface ContainerProps {
    type?: 'info' | 'success' | 'error'
    $hasDescription: boolean
}

const toastTypeVariations = {
    info: css`
        color: var(--toast-color-info);
        background: var(--toast-back-info);
    `,
    success: css`
        color: var(--toast-color-success);
        background: var(--toast-back-success);
    `,
    error: css`
        color: var(--toast-color-error);
        background: var(--toast-back-error);
    `,
}

export const Container = styled(animated.div)<ContainerProps>`
    display: flex;
    position: relative;

    width: 360px;
    padding: 16px 30px 16px 16px;
    border-radius: 10px;

    color: var(--blue);
    background: var(--ice);

    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);

    & + div {
        margin-top: 8px;
    }

    ${(props) => toastTypeVariations[props.type || 'info']}

    > svg {
        margin: 1px 12px 0 0;
    }

    div {
        flex: 1;

        p {
            margin-top: 4px;
            font-size: 14px;
            opacity: 0.8;
            line-height: 20px;
        }
    }

    button {
        position: absolute;
        top: 8px;
        right: 8px;

        color: inherit;
        background: transparent;
        opacity: 0.6;
    }

    ${(props) =>
        !props.$hasDescription &&
        css`
            align-items: center;

            svg {
                margin-top: 0;
            }
        `}
`
