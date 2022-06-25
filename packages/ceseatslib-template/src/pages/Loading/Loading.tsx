import React from "react";
import { CircularProgress, Container } from "@mui/material";
import s from "./Loading.module.scss";

const LoadingPage: React.FC = () => (
  <Container className={s.container}>
    <CircularProgress />
  </Container>
);

export default LoadingPage;
