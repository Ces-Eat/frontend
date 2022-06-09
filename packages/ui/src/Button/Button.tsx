import { ReactElement } from "react";
import s from "./Button.module.scss";

// eslint-disable-next-line import/prefer-default-export
export const Button = (): ReactElement => (
  <button className={s.test} type="button">
    Boop
  </button>
);
