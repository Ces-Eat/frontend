import { createTheme } from "@mui/material";

const defaultTheme = {
  typography: {
    h2: {
      fontSize: "42px",
      fontWeight: 500,
    },
    h5: {
      fontSize: "20px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "24px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "18px",
      fontWeight: 400,
    },
    allVariants: {
      color: "#000000",
      fontFamily: '"UberMove", Arial, Helvetica, sans-serif',
    },
  },
};

const lightTheme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#5FB709",
      contrastText: "#ffffff",
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
      default: "#30363d",
    },
    primary: {
      main: "#5FB709",
      contrastText: "#ffffff",
    },
    success: {
      main: "#057630",
    },
  },
  ...defaultTheme,
  components: {
    MuiInput: {
      styleOverrides: {
        input: {
          color: "white",
          "&::before": {
            "border-bottom": "1px solid rgba(0, 0, 0, 0.42);", // use your color
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {},
    },
  },
  typography: {
    ...defaultTheme.typography,
    allVariants: {
      color: "#fff",
      fontFamily: '"UberMove", Arial, Helvetica, sans-serif',
    },
  },
});

export { lightTheme, darkTheme };
