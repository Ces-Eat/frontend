import { alpha, createTheme } from "@mui/material";
import defaultTheme from "./default";

const darkTheme = createTheme(defaultTheme, {
  palette: {
    background: {
      default: "#30363d",
    },
    action: {
      disabled: alpha(defaultTheme.palette.tertiary.main, 0.5),
    },
    text: {
      primary: defaultTheme.palette.tertiary.main,
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha(defaultTheme.palette.tertiary.main, 0.5),
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: defaultTheme.palette.tertiary.main,
          "&::before": {
            borderColor: alpha(defaultTheme.palette.tertiary.main, 0.5),
          },
          ".MuiSvgIcon-root": {
            color: alpha(defaultTheme.palette.tertiary.main, 0.5),
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fieldset: {
            borderColor: alpha(defaultTheme.palette.tertiary.main, 0.5),
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: alpha(defaultTheme.palette.tertiary.main, 0.5),
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: defaultTheme.palette.secondary.main,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          color: defaultTheme.palette.tertiary.main,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: defaultTheme.palette.tertiary.main,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default darkTheme;
