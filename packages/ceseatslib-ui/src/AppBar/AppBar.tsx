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
import React, { Dispatch, SetStateAction, useState } from "react";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

interface Props {
  isLightTheme: boolean;
  children: React.ReactNode;
  link: string;
  changeTheme: Dispatch<SetStateAction<boolean>>;
  showMenu: boolean;
}

const AppBar: React.FC<Props> = ({
  changeTheme,
  isLightTheme,
  children,
  link,
  showMenu,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <Drawer
        anchor="left"
        onClose={() => setIsMenuOpen(false)}
        open={isMenuOpen}
      >
        <Box
          role="presentation"
          onClick={() => setIsMenuOpen(false)}
          component="div"
        >
          {children}
        </Box>
      </Drawer>
      <MuiAppBar position="sticky">
        <Toolbar>
          {showMenu && (
            <IconButton
              onClick={() => setIsMenuOpen(true)}
              sx={{ marginRight: "15px" }}
            >
              <Menu sx={{ color: "tertiary.main" }} />
            </IconButton>
          )}
          <Link href={link}>
            <Typography
              sx={{ marginRight: "15px", cursor: "pointer" }}
              variant="h5"
              color="tertiary.main"
            >
              Ces&apos;Eats
            </Typography>
          </Link>
          <ThemeSwitch changeTheme={changeTheme} value={isLightTheme} />
        </Toolbar>
      </MuiAppBar>
    </>
  );
};

export default AppBar;
