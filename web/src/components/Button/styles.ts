import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.button`
    width: 100%;
    height: 56px;

    padding: 0 16px;
    margin-top: 24px;

    color: var(--primary);
    border-radius: 10px;
    font-weight: 500;

    background: var(--secondary);

    transition: all 0.2s;

    &:hover {
        background: ${shade(0.2, '#ff9000')};
    }
`
