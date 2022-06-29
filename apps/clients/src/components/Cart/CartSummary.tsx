import React from "react";
import { Button, Container, Divider, Typography } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IArticle, IMenu } from "src/utils/store/reducers/cart";
import s from "styles/Orders.module.scss";
import { ICartAction, useStore } from "src/utils/hooks";

interface Props {
  summary: {
    articles: IArticle[];
    menus: IMenu[];
  };
  price: number;
  restaurantId: string;
  isEditable?: boolean;
}

const CartSummary: React.FC<Props> = ({
  summary,
  price,
  restaurantId,
  isEditable,
}) => {
  const { dispatchCart } = useStore();

  const handleCartChange = (
    action: ICartAction,
    article: IArticle | undefined,
    menu: IMenu | undefined
  ) => {
    dispatchCart({
      type: action,
      payload: {
        id: restaurantId,
        article,
        menu,
      },
    });
  };

  return (
    <>
      {summary.articles.map((article) => (
        <Container key={article._id} className={s.orderLine}>
          <Typography variant="nt">
            {article.name}
            {isEditable && (
              <Button
                color="error"
                className={s.act_btn}
                onClick={() =>
                  handleCartChange(
                    ICartAction.REMOVE_ARTICLE,
                    article,
                    undefined
                  )
                }
              >
                <RemoveCircleIcon />
              </Button>
            )}
            {isEditable
              ? article.quantity
              : article.quantity > 1
              ? `x${article.quantity}`
              : ""}
            {isEditable && (
              <Button
                color="success"
                className={s.act_btn}
                onClick={() =>
                  handleCartChange(ICartAction.ADD_ARTICLE, article, undefined)
                }
              >
                <AddCircleIcon />
              </Button>
            )}
          </Typography>
          <Typography variant="nt">
            {(article.price * article.quantity).toFixed(2)} €
          </Typography>
        </Container>
      ))}

      {summary.menus.map((menu) => (
        <>
          <Container key={menu._id} className={s.orderLine}>
            <Typography variant="nt">
              {menu.name}
              {isEditable && (
                <Button
                  color="error"
                  className={s.act_btn}
                  onClick={() =>
                    handleCartChange(ICartAction.REMOVE_MENU, undefined, menu)
                  }
                >
                  <RemoveCircleIcon />
                </Button>
              )}
              {isEditable
                ? menu.quantity
                : menu.quantity > 1
                ? `x${menu.quantity}`
                : ""}
              {isEditable && (
                <Button
                  color="success"
                  className={s.act_btn}
                  onClick={() =>
                    handleCartChange(ICartAction.ADD_MENU, undefined, menu)
                  }
                >
                  <AddCircleIcon />
                </Button>
              )}
            </Typography>
            <Typography variant="nt">
              {(menu.price * menu.quantity).toFixed(2)} €
            </Typography>
          </Container>
          {menu.content.map((c, i) =>
            c.articles.map((article) => (
              <Typography
                className={s.subArticle}
                variant="body2"
                key={`${i}-${menu._id}-${article._id}`}
              >
                {article.name}
              </Typography>
            ))
          )}
        </>
      ))}

      <Divider className={s.divider} />

      <Container className={s.orderLine}>
        <Typography variant="nt">Prix total</Typography>
        <Typography variant="nt">{parseFloat(price).toFixed(2)} €</Typography>
      </Container>
    </>
  );
};

CartSummary.defaultProps = {
  isEditable: false,
};

export default CartSummary;
