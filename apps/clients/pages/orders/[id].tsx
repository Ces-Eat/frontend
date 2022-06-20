import { NextPage } from "next";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
// import { useRouter } from "next/router";
import { toPng } from "html-to-image";
import Link from "next/link";
import s from "@styles/Orders.module.scss";
import { useRef } from "react";

const ReferedPage: NextPage = () => {
  // const router = useRouter();
  const invoiceRef = useRef(null);
  // const { id } = router.query;

  const order = {
    price: 168,
    summary: {
      articles: [
        {
          name: "Baguette",
          price: 2.4,
          quantity: 2,
        },
        {
          name: "Bretzel",
          price: 6,
          quantity: 1,
        },
        {
          name: "Burker",
          price: 3.6,
          quantity: 1,
        },
      ],
      menus: [
        {
          name: "BifTech2000",
          price: 14.6,
          quantity: 3,
          content: [
            {
              sectionName: "Clem",
              articles: [
                {
                  name: "Baguette",
                  price: 2.4,
                  quantity: 2,
                },
                {
                  name: "Bretzel",
                  price: 6,
                  quantity: 1,
                },
              ],
            },
          ],
        },
        {
          name: "BifTech3000",
          price: 14.6,
          quantity: 2,
          content: [
            {
              sectionName: "Clem",
              articles: [
                {
                  name: "Baguette",
                  price: 2.4,
                  quantity: 2,
                },
                {
                  name: "Bretzel",
                  price: 6,
                  quantity: 1,
                },
              ],
            },
            {
              sectionName: "Clem3",
              articles: [
                {
                  name: "Baguette",
                  price: 2.4,
                  quantity: 2,
                },
                {
                  name: "Bretzel",
                  price: 6,
                  quantity: 1,
                },
              ],
            },
          ],
        },
      ],
    },
  };

  const handleDownload = () => {
    if (invoiceRef?.current) {
      toPng(invoiceRef.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Invoice.png";
        link.href = dataUrl;
        link.click();
      });
    }
  };

  return (
    <Card className={s.container}>
      <Container ref={invoiceRef}>
        <CardContent>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ textDecoration: "underline" }}
          >
            Facture du 16/04/22
          </Typography>
          <Typography variant="body1">
            Chez &apos;Adresse de livrasion&apos;
          </Typography>
        </CardContent>
        <CardContent>
          {order.summary.articles.map((article) => (
            <Container
              key={`${article.name}-${article.quantity}`}
              className={s.orderLine}
            >
              <Typography variant="body1">
                {article.name}{" "}
                {article.quantity > 1 ? `x${article.quantity}` : ""}
              </Typography>
              <Typography variant="body1">{article.price} €</Typography>
            </Container>
          ))}

          {order.summary.menus.map((menu) => (
            <>
              <Container
                key={`${menu.name}-${menu.quantity}`}
                className={s.orderLine}
              >
                <Typography variant="body1">
                  {menu.name} {menu.quantity > 1 ? `x${menu.quantity}` : ""}
                </Typography>
                <Typography variant="body1">{menu.price} €</Typography>
              </Container>
              {menu.content.map((c) =>
                c.articles.map((article) => (
                  <Typography
                    className={s.subArticle}
                    variant="body2"
                    key={`${menu.name}-${article.name}`}
                  >
                    {article.name}
                  </Typography>
                ))
              )}
            </>
          ))}

          <Divider className={s.divider} />

          <Container className={s.orderLine}>
            <Typography variant="body1">Prix total</Typography>
            <Typography variant="body1">{order.price} €</Typography>
          </Container>
        </CardContent>
      </Container>
      <CardActions className={s.btnContainer}>
        <Link href="/orders">
          <Button variant="contained" color="error">
            Retour
          </Button>
        </Link>
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Télécharger
        </Button>
      </CardActions>
    </Card>
  );
};

export default ReferedPage;
