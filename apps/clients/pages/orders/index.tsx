import { Section, ActionCard } from "@ceseatslib/ui";
import { NextPage } from "next";
import Link from "next/link";
import { Container } from "@mui/material";
import s from "@styles/Wallets.module.scss";

const OrdersPage: NextPage = () => {
  const orders = [
    {
      id: "4564",
      name: "Burger King",
      date: "12/12/2020",
    },
    {
      id: "45",
      name: "Healthy Food",
      date: "12/12/2020",
    },
  ];

  return (
    <Section title="Historique de commande">
      <Container className={s.container}>
        {orders.map(({ name, id, date }) => (
          <Link href={`/orders/${id}`} key={id}>
            <a style={{ textDecoration: "none" }} href={`/orders/${id}`}>
              <ActionCard img="/assets/Drivers.png" title={name} desc={date} />
            </a>
          </Link>
        ))}
      </Container>
    </Section>
  );
};

export default OrdersPage;
