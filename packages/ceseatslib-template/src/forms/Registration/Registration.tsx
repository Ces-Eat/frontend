import React from "react";
import { Container, Divider, Typography } from "@mui/material";
import { IRegistration } from "./Registration.enum";
import s from "./Registration.module.scss";

interface Props {
  textType: IRegistration;
  children: React.ReactNode;
  switchRegistration?: () => void;
}

const TEXT = {
  [IRegistration.LOGIN]: {
    title: "Connexion",
    description: "Vous n'avez pas de compte ? ",
    link: {
      text: "Inscrivez-vous",
    },
  },
  [IRegistration.REGISTRATION]: {
    title: "Inscription",
    description: "Vous avez déjà un compte ? ",
    link: {
      text: "Connectez-vous",
    },
  },
};

const RegistrationTemplate: React.FC<Props> = ({
  children,
  textType,
  switchRegistration,
}) => (
  <>
    <Container className={s.form}>
      <Typography variant="h2" className={s.title} color="primary">
        {TEXT[textType].title}
      </Typography>
      {children}
    </Container>
    {switchRegistration && (
      <>
        <Divider sx={{ width: "80%" }} />
        <Container className={s.switch_form}>
          <Typography variant="mt">{TEXT[textType].description}</Typography>
          <Typography
            variant="mt"
            onClick={switchRegistration}
            className={s.link}
            color="primary"
          >
            {TEXT[textType].link.text}
          </Typography>
        </Container>
      </>
    )}
  </>
);

RegistrationTemplate.defaultProps = {
  switchRegistration: () => null,
};

export default RegistrationTemplate;
