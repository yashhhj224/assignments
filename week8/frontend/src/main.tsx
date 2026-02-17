
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { store } from "./redux/store";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing");
}

createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
