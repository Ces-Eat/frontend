import { Section } from "cel/ui";
import { ActionCard } from "cel/ui/cards";
import { NextPage } from "next";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import Link from "next/link";
import { Button, Container } from "@mui/material";
import s from "@styles/Wallets.module.scss";

const WalletsPage: NextPage = () => {
  const [cards, setCards] = useState([
    {
      id: "4564",
      cardNumber: "**** 8900",
      name: "Travail",
      expirationMonth: "01",
      expirationYear: "23",
    },
    {
      id: "45",
      cardNumber: "**** 8901",
      expirationMonth: "11",
      expirationYear: "26",
    },
    {
      id: "456984",
      cardNumber: "**** 8903",
      expirationMonth: "08",
      expirationYear: "31",
    },
  ]);

  const handleDelete = (id: string) => {
    setCards((el) => el.filter((card) => card.id !== id));
  };

  return (
    <Section title="Mes cartes">
      <Container className={s.container}>
        {cards.map(
          ({ name, cardNumber, id, expirationMonth, expirationYear }) => (
            <ActionCard
              key={id}
              img="/assets/Wallets.png"
              title={name || cardNumber}
              desc={`Expire le ${expirationMonth}/${expirationYear}`}
            >
              <CancelIcon
                onClick={() => handleDelete(id)}
                className={s.delete}
                color="error"
              />
            </ActionCard>
          )
        )}
      </Container>
      <Link href="/wallets/new">
        <Button variant="contained" color="primary">
          Ajouter une carte
        </Button>
      </Link>
    </Section>
  );
};

export default WalletsPage;
