/* eslint-disable @next/next/no-img-element */
import { Container, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { IRegistration } from "./Registration.enum";
import s from "./Registration.module.scss";

interface Props {
  img: {
    src: string;
    alt: string;
  };
  textType: IRegistration;
  children: React.ReactNode;
}

const TEXT = {
  [IRegistration.LOGIN]: {
    title: "Connexion",
    description: "Vous n’avez pas de compte ? ",
    link: {
      text: "Inscrivez-vous",
      href: "/register",
    },
  },
  [IRegistration.REGISTRATION]: {
    title: "Inscription",
    description: "Vous avez déjà un compte ? ",
    link: {
      text: "Connectez-vous",
      href: "/login",
    },
  },
};

const RegistrationTemplate: React.FC<Props> = ({
  img: { src, alt },
  children,
  textType,
}) => (
  <Container className={s.container}>
    <Container className={s.img_container}>
      <img src={src} alt={alt} className={s.img} />
    </Container>
    <Container className={s.form_container}>
      <Container className={s.form}>
        <Typography variant="h3" className={s.title} color="primary">
          {TEXT[textType].title}
        </Typography>
        {children}
      </Container>
      <Container className={s.switch_form}>
        <Typography variant="body2">
          {TEXT[textType].description}
          <Link href={TEXT[textType].link.href} color="primary">
            {TEXT[textType].link.text}
          </Link>
        </Typography>
      </Container>
    </Container>
  </Container>
);

export default RegistrationTemplate;
