import { Section } from "@ceseatslib/template";
import { ActionCard } from "@ceseatslib/ui";
import { Container } from "@mui/material";
import s from "styles/Stats.module.scss";

const Stats = () => (
  <Section title="Statistiques">
    <Container className={s.container}>
      <ActionCard title="Bénéfices" img="/assets/benef.png" desc="12.45€" />
      <ActionCard
        title="Commandes acceptés"
        img="/assets/accept.png"
        desc="12"
      />
      <ActionCard
        title="Nombre d'articles"
        img="/assets/default/defaultArticle.png"
        desc="12"
      />
      <ActionCard
        title="Nombre de menus"
        img="/assets/default/defaultArticle.png"
        desc="3"
      />
      <ActionCard
        title="Commandes refusés"
        img="/assets/declined.png"
        desc="3"
      />
    </Container>
  </Section>
);

Stats.requireAuth = "restaurant";

export default Stats;
