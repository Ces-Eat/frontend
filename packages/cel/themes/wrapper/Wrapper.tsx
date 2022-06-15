import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { ITheme } from "../types/themes";
import { lightTheme, darkTheme } from "../themes";
import "./Wrapper.scss";

interface Props {
  themeName: ITheme;
}

function choosenTheme(themeName: ITheme) {
  switch (themeName) {
    case ITheme.DARK:
      return darkTheme;
    case ITheme.LIGHT:
      return lightTheme;
    default:
      return lightTheme;
  }
}

const ThemeWrapper: React.FC<Props> = ({ children, themeName }) => {
  const theme = choosenTheme(themeName);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default ThemeWrapper;
