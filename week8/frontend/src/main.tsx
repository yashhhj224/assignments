
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing");
}

createRoot(container).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>
);
