import { Menu } from "@mui/icons-material";
import {
  Toolbar,
  AppBar as MuiAppBar,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";

const AppBar: React.FC = () => (
  <MuiAppBar position="sticky">
    <Toolbar>
      <IconButton>
        <Menu />
      </IconButton>
      <Typography>Ces&apos;</Typography>
      <Typography>Eats</Typography>
    </Toolbar>
  </MuiAppBar>
);

export default AppBar;
