import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { ITheme } from "../themes/themes.type";
import { lightTheme, darkTheme } from "../themes";

interface Props {
  themeName: ITheme;
  children: React.ReactNode;
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
