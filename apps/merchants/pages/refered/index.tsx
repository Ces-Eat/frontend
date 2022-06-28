import { ActionCard } from "@ceseatslib/ui";
import { Section } from "@ceseatslib/template";
import { Container, Typography } from "@mui/material";
import s from "styles/Wallets.module.scss";
import { useStore } from "src/utils/hooks";

const ReferedPage = () => {
  const {
    auth: { user },
  } = useStore();

  return (
    <Section title="Parrainage">
      <Container className={s.container}>
        <Typography
          variant="h6"
          sx={{
            userSelect: "text",
          }}
        >
          Code de parrainage - {user?.refererCode}
        </Typography>
        {user?.referedUsers.map(({ newUser: { name, surname, createdAt } }) => (
          <ActionCard
            key={`name-${name}-surname-${surname}-createdAt-${createdAt}`}
            img="/assets/default/defaultUser.png"
            title={name}
            desc={new Date(createdAt).toLocaleDateString()}
          />
        ))}
      </Container>
    </Section>
  );
};

ReferedPage.requireAuth = true;

export default ReferedPage;
