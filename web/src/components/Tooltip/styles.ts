import styled from 'styled-components'

export const Container = styled.div`
    position: relative;

    span {
        position: absolute;
        bottom: calc(100% + 12px);
        left: 50%;
        transform: translateX(-50%);

        width: 160px;
        padding: 8px;
        color: var(--primary);
        background: var(--secondary);
        border-radius: 4px;

        font-size: 14px;
        font-weight: 500;

        visibility: hidden;
        opacity: 0;
        transition: all 0.3s;

        &::before {
            position: absolute;
            top: 100%;
            left: 50%;
            bottom: 20px;

            border-width: 6px 6px 0 6px;
            border-style: solid;
            border-color: var(--secondary) transparent;
            transform: translateX(-50%);

            content: '';
        }
    }

    &:hover span {
        opacity: 1;
        visibility: visible;
    }
`
