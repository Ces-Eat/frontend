import React from "react";
import { Container, Typography } from "@mui/material";
import s from "./Header.module.scss";

interface Props {
  img: string;
  title: string;
  desc: string;
  rating: number;
}

const RestaurantHeader: React.FC<Props> = ({ img, title, desc, rating }) => (
  <Container className={s.container}>
    <Container className={s.img}>
      <img src={img} alt={title} />
    </Container>
    <Container className={s.content}>
      <Typography variant="h2">
        {title} - {rating}
      </Typography>
      <Typography variant="body2" className={s.desc} textAlign="justify">
        {desc}
      </Typography>
    </Container>
  </Container>
);

export default RestaurantHeader;
