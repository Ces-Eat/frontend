import React, { Fragment } from "react";
import { Container, Divider, Typography } from "@mui/material";
import { ProductCard } from "@ceseatslib/ui";
import { ICartAction, useStore } from "src/utils/hooks";
import s from "./Category.module.scss";

interface Props {
  name: string;
  products: any[];
  restaurantId: string;
  isMenu?: boolean;
}

const Category: React.FC<Props> = ({
  name,
  products,
  restaurantId,
  isMenu,
}) => {
  const { dispatchCart } = useStore();

  if (!products.length) return null;

  const handleArticle = (id: string) => {
    dispatchCart({
      type: ICartAction.ADD_ARTICLE,
      payload: {
        id: restaurantId,
        article: products.find((p) => p._id === id),
      },
    });
  };

  const handleMenu = (id: string) => {
    dispatchCart({
      type: ICartAction.ADD_MENU,
      payload: {
        id: restaurantId,
        menu: products.find((p) => p._id === id),
      },
    });
  };

  return (
    <Container className={s.category}>
      <Typography variant="h4">{name}</Typography>
      <Container className={s.products}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            onClick={() =>
              !isMenu ? handleArticle(product._id) : handleMenu(product._id)
            }
            name={product.name}
            desc={`${product.price} €`}
            img="/assets/default/defaultArticle.png"
          >
            {isMenu && (
              <>
                <Divider sx={{ margin: "10px auto", width: "50%" }} />
                {product.content.map(({ sectionName, articles }) => (
                  <Fragment key={sectionName}>
                    <Typography key={sectionName} variant="ntb" color="primary">
                      {sectionName}
                    </Typography>
                    {articles.map((article) => (
                      <Typography key={article._id} variant="body2">
                        {article.name}
                      </Typography>
                    ))}
                  </Fragment>
                ))}
              </>
            )}
          </ProductCard>
        ))}
      </Container>
    </Container>
  );
};

Category.defaultProps = {
  isMenu: false,
};

export default Category;
