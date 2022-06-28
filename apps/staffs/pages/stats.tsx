import { Section } from "@ceseatslib/template";
import { ActionCard } from "@ceseatslib/ui";
import { Container } from "@mui/material";
import s from "styles/Stats.module.scss";

const Stats = () => (
  <Section title="Statistiques">
    <Container className={s.container}>
      <ActionCard title="CA Globale" img="/assets/benef.png" desc="1200.45€" />
      <ActionCard
        title="Nombre de restaurants"
        img="/assets/default/defaultRestaurant.png"
        desc="12"
      />
      <ActionCard
        title="Nombre de clients"
        img="/assets/default/defaultUser.png"
        desc="12"
      />
      <ActionCard
        title="Nombre de livreurs"
        img="/assets/default/defaultOrder.png"
        desc="12"
      />
      <ActionCard
        title="Commandes acceptés"
        img="/assets/accept.png"
        desc="12"
      />
      <ActionCard
        title="Commandes refusés"
        img="/assets/declined.png"
        desc="3"
      />
    </Container>
  </Section>
);

Stats.requireAuth = "commercial";

export default Stats;
