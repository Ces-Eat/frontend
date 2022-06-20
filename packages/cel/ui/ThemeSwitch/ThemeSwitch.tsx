// @ts-nocheck
import React from "react";
import { Grid, Switch } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import s from "./ThemeSwitch.module.scss";

interface Props {
  changeTheme: () => void;
}

const ThemeSwitch: React.FC<Props> = ({ changeTheme }) => (
  <Grid component="label" container alignItems="center" justifyContent="right">
    <Grid item className={s.item}>
      <LightMode sx={{ color: "#fff" }} />
    </Grid>
    <Grid item>
      <Switch onChange={changeTheme} color="allWhite" />
    </Grid>
    <Grid item className={s.item}>
      <DarkMode sx={{ color: "#fff" }} />
    </Grid>
  </Grid>
);

export default ThemeSwitch;
