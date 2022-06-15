import { createTheme } from "@mui/material";

const defaultTheme = {
  typography: {
    h2: {
      fontSize: "42px",
      fontWeight: 500,
      fontFamily: '"UberMove", Arial, Helvetica, sans-serif',
    },
    subtitle1: {
      fontSize: "24px",
      fontWeight: 400,
      fontFamily: '"UberMove", Arial, Helvetica, sans-serif',
      color: "#A1A1A1",
    },
  },
};

const lightTheme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#1976d2",
    },
    success: {
      main: "#4caf50",
    },
  },
  ...defaultTheme,
});

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#000000",
    },
    primary: {
      main: "#BF22C4",
    },
    success: {
      main: "#057630",
    },
  },
  ...defaultTheme,
});

export { lightTheme, darkTheme };
