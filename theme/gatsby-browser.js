import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import "./src/style/layout.css";
import theme from "./src/style/theme";
import {LayoutProvider} from "./src/context/LayoutContext";
import {UserProvider} from "./src/context/UserContext";
import {ErrorBoundary} from "./src/components/ErrorBoundary";

export const wrapRootElement = ({ element }) => (
  <ErrorBoundary>
    <LayoutProvider>
      <UserProvider>
        <ThemeProvider theme={theme}>{element}</ThemeProvider>
      </UserProvider>
    </LayoutProvider>
  </ErrorBoundary>
);
