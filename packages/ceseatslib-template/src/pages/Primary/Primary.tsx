/* eslint-disable @next/next/no-img-element */
import { Container } from "@mui/material";
import React from "react";
import s from "./Primary.module.scss";

interface Props {
  img: {
    src: string;
    alt: string;
  };
  children: React.ReactNode;
  className?: string;
}

const PrimaryTemplate: React.FC<Props> = ({
  img: { src, alt },
  children,
  className,
}) => (
  <Container className={s.container}>
    <Container
      className={s.img_container}
      sx={{ backgroundColor: "primary.light" }}
    >
      <img src={src} alt={alt} className={s.img} />
    </Container>
    <Container className={`${s.content_container} ${className}`}>
      {children}
    </Container>
  </Container>
);

PrimaryTemplate.defaultProps = {
  className: "",
};

export default PrimaryTemplate;
