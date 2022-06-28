import React from "react";
import { Container, Typography } from "@mui/material";
import { ProductCard } from "@ceseatslib/ui";
import { ICartAction, useStore } from "src/utils/hooks";
import s from "./Category.module.scss";

interface Props {
  name: string;
  products: any[];
  restaurantId: string;
}

const Category: React.FC<Props> = ({ name, products, restaurantId }) => {
  const { dispatchCart } = useStore();

  if (!products.length) return null;

  const handleArticle = (id: string) => {
    dispatchCart({
      type: ICartAction.ADD_ARTICLE,
      payload: { id: restaurantId, article: products.find((p) => p.id === id) },
    });
  };

  const handleMenu = (id: string) => {
    console.log(`clicked : ${id}`);
  };

  return (
    <Container className={s.category}>
      <Typography variant="h4">{name}</Typography>
      <Container className={s.products}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            onClick={() =>
              name !== "Menu"
                ? handleArticle(product.id)
                : handleMenu(product.id)
            }
            {...product}
            img="/assets/default/defaultArticle.png"
          />
        ))}
      </Container>
    </Container>
  );
};

export default Category;
