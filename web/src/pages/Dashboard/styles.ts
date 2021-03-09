import styled, { css } from 'styled-components'
import { shade } from 'polished'

const Clock = css`
    margin-left: auto;
    color: #999591;
    display: flex;
    align-items: center;

    svg {
        color: var(--secondary);
        margin-right: 8px;
    }
`

export const Container = styled.div``

export const Header = styled.header`
    padding: 32px 0;
    background: #28262e;
`

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;

    display: flex;
    align-items: center;

    > img {
        height: 80px;
    }

    button {
        margin-left: auto;
        background: none;

        svg {
            width: 20px;
            height: 20px;
            color: #999591;
        }
    }
`

export const Profile = styled.div`
    margin-left: 80px;

    display: flex;
    align-items: center;

    img {
        width: 56px;
        height: 56px;

        border-radius: 50%;
    }

    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 26px;

        span {
            color: var(--light-gray);
        }

        strong {
            color: var(--secondary);
        }

        a {
            transition: all 0.2s;
            &:hover {
                opacity: 0.7;
            }
        }
    }
`

export const Content = styled.main`
    max-width: 1120px;
    margin: 64px auto;

    display: flex;
`
export const Schedule = styled.div`
    margin-right: 120px;
    flex: 1;

    h1 {
        font-size: 36px;
    }

    p {
        margin-top: 8px;
        color: var(--secondary);
        font-weight: 500;
        display: flex;
        align-items: center;

        span {
            display: flex;
            align-items: center;
        }

        span + span::before {
            width: 1px;
            height: 12px;
            margin: 0 8px;
            background: var(--secondary);

            content: '';
        }
    }
`

export const NextAppointment = styled.div`
    margin-top: 64px;

    > strong {
        color: #999591;
        font-size: 20px;
        font-weight: 400;
    }

    div {
        padding: 16px 24px;
        margin-top: 24px;
        border-radius: 10px;
        background: #3e3b47;

        display: flex;
        align-items: center;

        position: relative;

        &::before {
            width: 2px;
            height: 80%;
            background: var(--secondary);

            position: absolute;
            top: 10%;
            left: 0;

            content: '';
        }

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }

        strong {
            margin-left: 24px;
        }

        span {
            ${Clock}
        }
    }
`

export const Section = styled.section`
    margin-top: 48px;

    > strong {
        padding-bottom: 16px;
        margin-bottom: 16px;
        color: #999591;
        border-bottom: 1px solid #3e3b47;
        font-size: 20px;
        line-height: 26px;

        display: block;
    }

    > p {
        color: #999591;
    }
`

export const Appointment = styled.div`
    display: flex;
    align-items: center;

    & + div {
        margin-top: 16px;
    }

    span {
        width: 70px;
        ${Clock}
        color: #f4ede8;
    }

    div {
        padding: 16px 24px;
        margin-left: 24px;

        border-radius: 10px;
        background: #3e3b47;

        display: flex;
        align-items: center;
        flex: 1;

        img {
            width: 56px;
            height: 56px;
            border-radius: 50%;
        }

        strong {
            margin-left: 24px;
            font-size: 18px;
        }
    }
`

export const Calendar = styled.aside`
    width: 380px;

    .DayPicker {
        background: #28262e;
        border-radius: 10px;
    }

    .DayPicker-wrapper {
        padding-bottom: 0;
    }

    .DayPicker,
    .DayPicker-Month {
        width: 100%;
    }

    .DayPicker-Month {
        border-collapse: separate;
        border-spacing: 8px;
        margin: 16px;
    }

    .DayPicker-Day {
        width: 40px;
        height: 40px;
    }

    .DayPicker-Day--available:not(.DayPicker-Day--outside) {
        background: #3e3b47;
        border-radius: 10px;
        color: #fff;
    }

    .DayPicker:not(.DayPicker--interactionDisabled)
        .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
        background: ${shade(0.2, '#3e3b47')};
    }

    .DayPicker-Day--today {
        font-weight: normal;
    }

    .DayPicker-Day--disabled {
        color: #666360 !important;
        background: transparent !important;
    }

    .DayPicker-Day--selected {
        background: #ff9000 !important;
        border-radius: 10px;
        color: #232129 !important;
    }
`
