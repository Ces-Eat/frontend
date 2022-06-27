import { ActionCard } from "@ceseatslib/ui";
import { Section } from "@ceseatslib/template";
import { Button, Container } from "@mui/material";
import s from "@styles/Wallets.module.scss";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import { useStore } from "src/utils/hooks";

const ReferedPage = () => {
  const { createNotification } = useNotificationCenter();
  const {
    auth: { user },
  } = useStore();

  return (
    <Section title="Historique de commande">
      <Container className={s.container}>
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={() => {
            createNotification(
              INotificationType.INFO,
              "Code copié dans le presse-papier"
            );
            navigator.clipboard.writeText(user?.refererCode || "");
          }}
        >
          Code de parrainage - {user?.refererCode}
        </Button>
        {user?.referedUsers.map(({ newUser: { name, surname, createdAt } }) => (
          <ActionCard
            key={`name-${name}-surname-${surname}-createdAt-${createdAt}`}
            img="/assets/default/defaultUser.png"
            title={name}
            desc={createdAt}
          />
        ))}
      </Container>
    </Section>
  );
};

ReferedPage.requireAuth = true;

export default ReferedPage;
