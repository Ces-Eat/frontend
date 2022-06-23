import { ActionCard } from "@ceseatslib/ui";
import { Section } from "@ceseatslib/template";
import { NextPage } from "next";
import { Button, Container } from "@mui/material";
import s from "@styles/Wallets.module.scss";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";

const ReferedPage: NextPage = () => {
  const { createNotification } = useNotificationCenter();
  const code = "XJKe-4585";

  const refered = [
    {
      id: "4564",
      name: "Clément GASTON",
      date: "12/12/2020",
    },
    {
      id: "45",
      name: "Gabriel RICARD",
      date: "12/12/2020",
    },
  ];

  return (
    <Section title="Historique de commande">
      <Container className={s.container}>
        <Button
          variant="contained"
          color="primary"
          type="button"
          onClick={() => {
            createNotification(
              INotificationType.INFO,
              "Code copié dans le presse-papier"
            );
            navigator.clipboard.writeText(code);
          }}
        >
          Code de parrainage - {code}
        </Button>
        {refered.map(({ name, id, date }) => (
          <ActionCard
            key={id}
            img="/assets/Refered.png"
            title={name}
            desc={date}
          />
        ))}
      </Container>
    </Section>
  );
};

export default ReferedPage;
