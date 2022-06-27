// @ts-nocheck
import React, { Dispatch, SetStateAction } from "react";
import { Grid, Switch } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import s from "./ThemeSwitch.module.scss";

interface Props {
  value: boolean;
  changeTheme: Dispatch<SetStateAction<boolean>>;
}

const ThemeSwitch: React.FC<Props> = ({ changeTheme, value }) => (
  <Grid component="label" container alignItems="center" justifyContent="right">
    <Grid item className={s.item}>
      <LightMode color="tertiary" />
    </Grid>
    <Grid item>
      {value !== null && (
        <Switch color="tertiary" onChange={changeTheme} checked={!value} />
      )}
    </Grid>
    <Grid item className={s.item}>
      <DarkMode color="tertiary" />
    </Grid>
  </Grid>
);

export default ThemeSwitch;
