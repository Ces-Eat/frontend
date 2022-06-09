import { ReactElement } from "react";
import s from "./Button.module.scss";

export const Button = (): ReactElement => (
  <button className={s.test} type="button">
    Boop
  </button>
);
