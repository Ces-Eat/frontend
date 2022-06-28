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

  const onClick = (id: string) => {
    console.log(`clicked : ${id}`);
  };

  return (
    <Container className={s.category}>
      <Typography variant="h4">{name}</Typography>
      <Container className={s.products}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            onClick={() => onClick(product.id)}
            {...product}
            img="/assets/default/defaultArticle.png"
          />
        ))}
      </Container>
    </Container>
  );
};

export default Category;
