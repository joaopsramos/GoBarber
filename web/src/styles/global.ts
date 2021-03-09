import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
        border: 0;
    }

    body {
        color: #fff;
        background: var(--primary);
        -webkit-font-smoothing: antialiased;
    }

    body, button, input {
        font-size: 16px;
        font-family: 'Roboto Slab', serif;
    }

    button {
        cursor: pointer;
        background: none;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 500;
    }

    :root {
        --primary: #312e38;
        --secondary: #ff9000;
        --tertiary: #232129;
        --quaternary: #666360;
        --light-gray: #f4ede8;
        --danger: #c53030;
        --toast-color-info: #3172b7;
        --toast-back-info: #e8f8ff;
        --toast-color-success: #2e656a;
        --toast-back-success: #e6fffa;
        --toast-color-error: #c53030;
        --toast-back-error: #fddede;
    }
`
