
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    min-height: 100vh;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea {
    outline: none;
    border: none;
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
