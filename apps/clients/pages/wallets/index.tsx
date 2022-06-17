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
    },
    {
      id: "45",
      cardNumber: "**** 8901",
    },
    {
      id: "456984",
      cardNumber: "**** 8903",
    },
  ]);

  const handleDelete = (id: string) => {
    setCards((el) => el.filter((card) => card.id !== id));
  };

  return (
    <Section title="Wallets">
      <Container className={s.container}>
        {cards.map(({ cardNumber, id }) => (
          <ActionCard key={id} img="/assets/Wallets.png" title={cardNumber}>
            <CancelIcon
              onClick={() => handleDelete(id)}
              className={s.delete}
              color="error"
            />
          </ActionCard>
        ))}
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
