import { PrimaryTemplate } from "@ceseatslib/template";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import CartSummary from "@components/Cart";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useStore } from "src/utils/hooks";
import s from "styles/Confirm.module.scss";

const ConfirmPage = () => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const { createNotification } = useNotificationCenter();
  const router = useRouter();
  const { id } = router.query;
  const { cart } = useStore();

  useEffect(() => {
    if (!id) {
      router.push(`/restaurants`);
    } else if (!cart[id]) {
      router.push(`/restaurants/${id}`);
    }
  }, [id]);

  useEffect(() => {
    axios
      .get(`${process.env.API_WALLET}`, { withCredentials: true })
      .then(({ data }) => {
        setWallets(data);
        console.log(data);
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Erreur, veuillez réessayer plus tard"
        );
      });
  }, []);

  return (
    <Container className={s.loginContainer}>
      {cart[id] && (
        <PrimaryTemplate
          img={{ src: "/assets/confirmOrder.png", alt: "Image de commande" }}
        >
          <Container className={s.cart}>
            <Typography className={s.cart_title} variant="h3">
              Panier
            </Typography>
            <Container className={s.cart_content}>
              <CartSummary
                summary={{
                  articles: cart[id].articles,
                  menus: cart[id].menus,
                }}
                price={cart[id].price}
                restaurantId={id}
              />
            </Container>
            <Container className={s.btn_container}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Carte</InputLabel>
                <Select
                  defaultValue={{}}
                  className={s.wallet}
                  variant="standard"
                  onSelect={setSelectedWallet}
                >
                  {wallets.length > 0 ? (
                    wallets.map((wallet) => (
                      <MenuItem
                        key={wallet.id}
                        value={wallet}
                        onClick={() => setSelectedWallet(wallet)}
                      >
                        {wallet.designation ||
                          (wallet.cardNumber &&
                            `**** ${wallet.cardNumber.slice(-4)}`)}
                      </MenuItem>
                    ))
                  ) : (
                    <Link href="/wallets/new">
                      <MenuItem>Ajouter une carte</MenuItem>
                    </Link>
                  )}
                </Select>
              </FormControl>
              <Container className={s.btn_container2}>
                <Link href={`/restaurants/${id}`}>
                  <Button className={s.pay} variant="outlined" color="error">
                    Retour
                  </Button>
                </Link>
                <Button
                  className={s.pay}
                  variant="outlined"
                  color="success"
                  disabled={!selectedWallet}
                >
                  Payer
                </Button>
              </Container>
            </Container>
          </Container>
        </PrimaryTemplate>
      )}
    </Container>
  );
};

ConfirmPage.requireAuth = true;

export default ConfirmPage;
