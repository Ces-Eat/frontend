import { alpha, createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    americanR1: Palette["primary"];
    americanR2: Palette["primary"];
    americanR3: Palette["primary"];
    americanR4: Palette["primary"];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    americanR1?: PaletteOptions["primary"];
    americanR2?: PaletteOptions["primary"];
    americanR3?: PaletteOptions["primary"];
    americanR4?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    lt: React.CSSProperties;
    ltb: React.CSSProperties;
    mt: React.CSSProperties;
    mtb: React.CSSProperties;
    nt: React.CSSProperties;
    ntb: React.CSSProperties;
    st: React.CSSProperties;
    stb: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    lt?: React.CSSProperties;
    ltb?: React.CSSProperties;
    mt?: React.CSSProperties;
    mtb?: React.CSSProperties;
    nt?: React.CSSProperties;
    ntb?: React.CSSProperties;
    st?: React.CSSProperties;
    stb?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    lt: true;
    ltb: true;
    mt: true;
    mtb: true;
    nt: true;
    ntb: true;
    st: true;
    stb: true;
  }
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#5FB709",
      light: alpha("#5FB709", 0.3),
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#142328",
      contrastText: "#ffffff",
    },
    tertiary: {
      main: "#f6f0ea",
      contrastText: "#000000",
    },
    info: {
      main: "#0288D1",
      contrastText: "#ffffff",
    },
    success: {
      main: "#388E3C",
      contrastText: "#ffffff",
    },
    error: {
      main: "#D32F2F",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#F57C00",
      contrastText: "#ffffff",
    },
    americanR1: {
      main: "#636E72",
    },
    americanR2: {
      main: "#737D81",
    },
    americanR3: {
      main: "#9CA7AC",
    },
    americanR4: {
      main: "#B2BEC3",
    },
  },
  typography: {
    h1: {
      fontSize: "56px",
      lineHeight: "60px",
    },
    h2: {
      fontSize: "48px",
      lineHeight: "52px",
    },
    h3: {
      fontSize: "40px",
      lineHeight: "44px",
    },
    h4: {
      fontSize: "32px",
      lineHeight: "35px",
    },
    h5: {
      fontSize: "24px",
      lineHeight: "26px",
    },
    h6: {
      fontSize: "20px",
      lineHeight: "22px",
    },
    lt: {
      fontSize: "20px",
      lineHeight: "28px",
    },
    ltb: {
      fontSize: "20px",
      lineHeight: "28px",
    },
    mt: {
      fontSize: "18px",
      lineHeight: "25px",
    },
    mtb: {
      fontSize: "18px",
      lineHeight: "25px",
    },
    nt: {
      fontSize: "16px",
      lineHeight: "22px",
    },
    ntb: {
      fontSize: "16px",
      lineHeight: "22px",
    },
    st: {
      fontSize: "14px",
      lineHeight: "19px",
    },
    stb: {
      fontSize: "14px",
      lineHeight: "19px",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "100% !important",
          padding: "0 !important",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: "20px",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "40px",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: "10px",
          paddingRight: "20px",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          "&:hover .MuiListItemIcon-root, &:hover .MuiListItemText-primary": {
            color: "#5FB709",
          },
        },
      },
    },
  },
});

export default defaultTheme;
