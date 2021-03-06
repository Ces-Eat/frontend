import { ActionCard } from "@ceseatslib/ui";
import { LoadingPage, Section } from "@ceseatslib/template";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Container } from "@mui/material";
import s from "styles/Wallets.module.scss";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import axios from "axios";
import { IWallet } from "@ceseatslib/form";
import Head from "next/head";

const WalletsPage = () => {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [wallets, setWallets] = useState<IWallet[]>([]);
  const { createNotification } = useNotificationCenter();

  useEffect(() => {
    axios
      .get(`${process.env.API_WALLET}`, { withCredentials: true })
      .then(({ data }) => {
        setWallets(data);
        setIsLoadingData(false);
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Erreur, veuillez réessayer plus tard"
        );
        setIsLoadingData(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    axios
      .delete(`${process.env.API_WALLET}/${id}`, { withCredentials: true })
      .then(() => {
        setWallets((el) => el.filter((card) => card.id !== id));
        createNotification(
          INotificationType.SUCCESS,
          "Carte supprimé avec succès"
        );
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Erreur, veuillez réessayer plus tard"
        );
      });
  };

  if (isLoadingData) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Clients - Cartes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section title="Mes cartes">
        <Container className={s.container}>
          {wallets.map(
            ({
              designation,
              cardNumber,
              id,
              expirationMonth,
              expirationYear,
            }) => (
              <ActionCard
                key={id}
                img="/assets/Wallets.png"
                title={
                  designation || (cardNumber && `**** ${cardNumber.slice(-4)}`)
                }
                desc={`Expire le ${expirationMonth}/${expirationYear}`}
              >
                <CancelIcon
                  onClick={() => handleDelete(id || "")}
                  className={s.delete}
                  color="error"
                />
              </ActionCard>
            )
          )}
        </Container>
        <Link href="/wallets/new">
          <Button variant="outlined" color="primary">
            Ajouter une carte
          </Button>
        </Link>
      </Section>
    </>
  );
};

WalletsPage.requireAuth = true;

export default WalletsPage;
