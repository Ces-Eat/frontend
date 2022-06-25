import React from "react";
import { Container, Typography } from "@mui/material";
import s from "./Error.module.scss";

const ErrorPage: React.FC = () => (
  <Container className={s.container}>
    <Typography>
      Impossible de récupérer les données, veuilez ressayer plus tard...
    </Typography>
  </Container>
);

export default ErrorPage;
