import React from "react";
import { Container, Typography } from "@mui/material";
import { ProductCard } from "@ceseatslib/ui";
import s from "./Category.module.scss";

interface Props {
  name: string;
  products: any[];
}

const Category: React.FC<Props> = ({ name, products }) => {
  if (!products.length) return null;

  return (
    <Container className={s.category}>
      <Typography variant="h4">{name}</Typography>
      <Container className={s.products}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Container>
    </Container>
  );
};

export default Category;
