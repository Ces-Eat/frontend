import "@mui/material";

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
