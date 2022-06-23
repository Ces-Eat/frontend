import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";
import s from "./ProductCard.module.scss";

interface Props {
  img: string;
  name: string;
  desc: string;
  rating?: number;
  onClick?: () => void;
}

const ProductCard: React.FC<Props> = ({ img, name, desc, rating, onClick }) => (
  <Card className={s.container}>
    <CardMedia component="img" src={img} className={s.img} />
    <CardContent>
      <Container className={s.title_container}>
        <Typography variant="h5">{name}</Typography>
        {rating && (
          <Typography variant="nt" className={s.rating}>
            {rating}
          </Typography>
        )}
      </Container>
      <Typography variant="body2">{desc}</Typography>
    </CardContent>
    {onClick && (
      <AddCircleIcon
        onClick={onClick}
        className={s.button}
        sx={{ color: "#fff" }}
      />
    )}
  </Card>
);

ProductCard.defaultProps = { rating: undefined, onClick: undefined };

export default ProductCard;
