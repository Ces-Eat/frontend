import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    allWhite?: Palette["primary"];
  }
  interface PaletteOptions {
    allWhite?: PaletteOptions["primary"];
  }
}

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
    allWhite: {
      main: "#ffffff",
    },
  },
  ...defaultTheme,
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "18px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "18px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },
  },
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
    allWhite: {
      main: "#ffffff",
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
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "18px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "18px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {},
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#30363d",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          cursor: "pointer",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
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
