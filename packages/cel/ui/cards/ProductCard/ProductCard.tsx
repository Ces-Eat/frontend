import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";
import s from "./ProductCard.module.scss";

interface Props {
  img: string;
  name: string;
  price: number;
  onClick: () => void;
}

const ProductCard: React.FC<Props> = ({ img, name, price, onClick }) => (
  <Card className={s.container}>
    <CardMedia component="img" src={img} className={s.img} />
    <CardContent>
      <Typography variant="h5">{name}</Typography>
      <Typography variant="body2">{price} €</Typography>
    </CardContent>
    <AddCircleIcon onClick={onClick} className={s.button} color="primary" />
  </Card>
);

export default ProductCard;
