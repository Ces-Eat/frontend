import React from "react";
import { Container, Typography } from "@mui/material";
import s from "./Header.module.scss";

interface Props {
  img: string;
  title: string;
  desc: string;
}

const RestaurantHeader: React.FC<Props> = ({ img, title, desc }) => (
  <Container className={s.container} sx={{ backgroundColor: "primary.light" }}>
    <Container className={s.img}>
      <img src={img} alt={title} />
    </Container>
    <Container className={s.content}>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="body2" className={s.desc} textAlign="justify">
        {desc}
      </Typography>
    </Container>
  </Container>
);

export default RestaurantHeader;
