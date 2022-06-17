import { Menu } from "@mui/icons-material";
import {
  Toolbar,
  AppBar as MuiAppBar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import React from "react";

interface Props {
  isLightTheme: boolean;
  setIsLightTheme: (isLightTheme: boolean) => void;
}

const AppBar: React.FC<Props> = ({ isLightTheme, setIsLightTheme }) => (
  <MuiAppBar position="sticky">
    <Toolbar>
      <IconButton>
        <Menu />
      </IconButton>
      <Typography>Ces&apos;</Typography>
      <Typography>Eats</Typography>
      <Button onClick={() => setIsLightTheme(!isLightTheme)} color="secondary">
        Change theme
      </Button>
    </Toolbar>
  </MuiAppBar>
);

export default AppBar;
