import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import "./src/style/layout.css";
import theme from "./src/style/theme";
import {ErrorBoundary} from "./src/components/ErrorBoundary";

export const wrapRootElement = ({ element }) => (
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  </ErrorBoundary>
);
