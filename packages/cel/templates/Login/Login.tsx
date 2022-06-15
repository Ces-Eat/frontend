/* eslint-disable @next/next/no-img-element */
import { Container } from "@mui/material";
import React from "react";
import s from "./Login.module.scss";

interface Props {
  img: {
    src: string;
    alt: string;
  };
}

const LoginTemplate: React.FC<Props> = ({ img: { src, alt }, children }) => (
  <Container className={s.container}>
    <Container className={s.img_container}>
      <img src={src} alt={alt} className={s.img} />
    </Container>
    <Container className={s.form_container}>{children}</Container>
  </Container>
);

export default LoginTemplate;
