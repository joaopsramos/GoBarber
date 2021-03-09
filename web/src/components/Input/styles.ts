import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip'

interface ContainerProps {
    isFocused: boolean
    isFilled: boolean
    hasError: boolean
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;

    width: 100%;
    padding: 16px;

    border: 2px solid var(--tertiary);
    border-radius: 10px;

    color: var(--quaternary);
    background: var(--tertiary);

    transition: all 0.2s;

    & + div {
        margin-top: 8px;
    }

    ${(props) =>
        props.hasError &&
        css`
            color: var(--danger);
            border-color: var(--danger);
        `}

    ${(props) =>
        props.isFocused &&
        css`
            color: var(--secondary);
            border-color: var(--secondary);
        `}

    ${(props) =>
        props.isFilled &&
        !props.hasError &&
        css`
            color: #ff9000;
        `}

    input {
        flex: 1;
        color: #fff;
        background: transparent;
    }

    > svg {
        margin-right: 16px;
    }
`

export const Error = styled(Tooltip)`
    margin-left: 16px;

    span {
        color: #fff;
        background: var(--danger);

        &::before {
            border-color: var(--danger) transparent;
        }
    }
`
