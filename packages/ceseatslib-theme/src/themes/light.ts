import { createTheme } from "@mui/material";
import defaultTheme from "./default";

const lightTheme = createTheme(defaultTheme, {
  palette: {
    background: {
      default: "#ffffff",
    },
    text: {
      primary: defaultTheme.palette.secondary.main,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: defaultTheme.palette.secondary.main,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: defaultTheme.palette.secondary.main,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#f6f0ea",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default lightTheme;
