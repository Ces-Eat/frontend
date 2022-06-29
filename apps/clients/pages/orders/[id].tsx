import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
// import { useRouter } from "next/router";
import { toPng } from "html-to-image";
import Link from "next/link";
import s from "styles/Orders.module.scss";
import { useRef } from "react";
import CartSummary from "src/components/Cart";

const OrderPage = () => {
  // const router = useRouter();
  const invoiceRef = useRef(null);
  // const { id } = router.query;

  const order = {
    id: "1",
    price: 168,
    restaurant: { id: "1" },
    summary: {
      articles: [
        {
          id: "2",
          name: "Baguette",
          price: 2.4,
          quantity: 2,
        },
        {
          id: "3",
          name: "Bretzel",
          price: 6,
          quantity: 1,
        },
        {
          id: "4",
          name: "Burker",
          price: 3.6,
          quantity: 1,
        },
      ],
      menus: [
        {
          id: "5",
          name: "BifTech2000",
          price: 14.6,
          quantity: 3,
          content: [
            {
              sectionName: "Clem",
              articles: [
                {
                  id: "6",
                  name: "Baguette",
                  price: 2.4,
                  quantity: 2,
                },
                {
                  id: "7",
                  name: "Bretzel",
                  price: 6,
                  quantity: 1,
                },
              ],
            },
          ],
        },
        {
          id: "8",
          name: "BifTech3000",
          price: 14.6,
          quantity: 2,
          content: [
            {
              sectionName: "Clem",
              articles: [
                {
                  id: "9",
                  name: "Baguette",
                  price: 2.4,
                  quantity: 2,
                },
                {
                  id: "10",
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
                  id: "11",
                  name: "Baguette",
                  price: 2.4,
                  quantity: 2,
                },
                {
                  id: "12",
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
          <Typography variant="h4" textAlign="center">
            Facture du 16/04/22
          </Typography>
          <Typography variant="nt">
            Chez &apos;Adresse de livrasion&apos; :
          </Typography>
          <br />
          <Typography variant="nt">Livré par :</Typography>
          <br />
          <Typography variant="nt">Fournis par :</Typography>
        </CardContent>
        <CardContent>
          <CartSummary {...order} restaurantId={order.restaurant.id} />
        </CardContent>
      </Container>
      <CardActions className={s.btnContainer}>
        <Link href="/orders">
          <Button variant="outlined" color="error">
            Retour
          </Button>
        </Link>
        <Button variant="outlined" color="primary" onClick={handleDownload}>
          Télécharger
        </Button>
      </CardActions>
    </Card>
  );
};

OrderPage.requireAuth = true;

export default OrderPage;
