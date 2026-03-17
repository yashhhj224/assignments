
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Inter, system-ui, sans-serif;
    background: #f3f4f6;
  }

  button {
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }

  /* hide scrollbar but allow scroll */

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;