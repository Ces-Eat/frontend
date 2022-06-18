import { Menu } from "@mui/icons-material";
import {
  Toolbar,
  AppBar as MuiAppBar,
  Typography,
  IconButton,
  Drawer,
  Box,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

interface Props {
  changeTheme: () => void;
}

const AppBar: React.FC<Props> = ({ changeTheme, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <Drawer
        anchor="left"
        onClose={() => setIsMenuOpen(false)}
        open={isMenuOpen}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setIsMenuOpen(false)}
          component="div"
        >
          {children}
        </Box>
      </Drawer>
      <MuiAppBar position="sticky">
        <Toolbar>
          <IconButton
            onClick={() => setIsMenuOpen(true)}
            sx={{ color: "#fff", marginRight: "15px" }}
          >
            <Menu />
          </IconButton>
          <Link href="/restaurants">
            <Typography sx={{ color: "#fff", marginRight: "15px" }}>
              Ces&apos;Eats
            </Typography>
          </Link>
          <ThemeSwitch changeTheme={changeTheme} />
        </Toolbar>
      </MuiAppBar>
    </>
  );
};

export default AppBar;
