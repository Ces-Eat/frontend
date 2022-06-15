import React from "react";
import { Container, Typography } from "@mui/material";
import s from "./Section.module.scss";

interface Props {
  title: string;
  description?: string;
}

const OfferCard: React.FC<Props> = ({ title, description, children }) => (
  <Container className={s.container}>
    <Container className={s.titleContainer}>
      <Typography variant="h2">{title}</Typography>
      {description && (
        <Typography variant="subtitle1">{description}</Typography>
      )}
    </Container>
    {children}
  </Container>
);

OfferCard.defaultProps = {
  description: "",
};

export default OfferCard;
