import { ActionCard } from "@ceseatslib/ui";
import { Section } from "@ceseatslib/template";
import { Container } from "@mui/material";
import s from "@styles/Wallets.module.scss";
import Link from "next/link";

const Developer = () => (
  <Section title="NPM Packages">
    <Container className={s.container}>
      <Link href="https://www.npmjs.com/package/@ceseatslib/utils">
        <a
          href="https://www.npmjs.com/package/@ceseatslib/utils"
          target="_blank"
          rel="noreferrer"
          className={s.link}
        >
          <ActionCard
            img="/assets/default/defaultAPI.png"
            title="Outils divers"
            desc="@ceseatslib/utils"
          />
        </a>
      </Link>
      <Link href="https://www.npmjs.com/package/@ceseatslib/ui">
        <a
          href="https://www.npmjs.com/package/@ceseatslib/ui"
          target="_blank"
          rel="noreferrer"
          className={s.link}
        >
          <ActionCard
            img="/assets/default/defaultAPI.png"
            title="Composants UI"
            desc="@ceseatslib/ui"
          />
        </a>
      </Link>
      <Link href="https://www.npmjs.com/package/@ceseatslib/theme">
        <a
          href="https://www.npmjs.com/package/@ceseatslib/theme"
          target="_blank"
          rel="noreferrer"
          className={s.link}
        >
          <ActionCard
            img="/assets/default/defaultAPI.png"
            title="MUI Theme"
            desc="@ceseatslib/theme"
          />
        </a>
      </Link>
      <Link href="https://www.npmjs.com/package/@ceseatslib/template">
        <a
          href="https://www.npmjs.com/package/@ceseatslib/template"
          target="_blank"
          rel="noreferrer"
          className={s.link}
        >
          <ActionCard
            img="/assets/default/defaultAPI.png"
            title="Page template"
            desc="@ceseatslib/template"
          />
        </a>
      </Link>
      <Link href="https://www.npmjs.com/package/@ceseatslib/form">
        <a
          href="https://www.npmjs.com/package/@ceseatslib/form"
          target="_blank"
          rel="noreferrer"
          className={s.link}
        >
          <ActionCard
            img="/assets/default/defaultAPI.png"
            title="Formulaire"
            desc="@ceseatslib/form"
          />
        </a>
      </Link>
    </Container>
  </Section>
);

Developer.requireAuth = true;

export default Developer;
