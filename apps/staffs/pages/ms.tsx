import { Section } from "@ceseatslib/template";
import { ActionCard } from "@ceseatslib/ui";
import { Container, Typography } from "@mui/material";
import React from "react";
import { useStore } from "src/utils/hooks";
import { MsValue } from "src/utils/store";
import s from "styles/Stats.module.scss";

const MsPage = () => {
  const { msOrder, msRestaurant, msUser } = useStore();

  const switchRender = (type: MsValue.UP | MsValue.PENDING | MsValue.DOWN) => {
    switch (type) {
      case MsValue.UP:
        return <Typography color="primary">Up</Typography>;
      case MsValue.DOWN:
        return <Typography color="error">Down</Typography>;
      case MsValue.PENDING:
        return <Typography color="warning">Pending</Typography>;
      default:
        return <Typography>Unknown</Typography>;
    }
  };
  return (
    <Section title="Micro Services">
      <Container className={s.container}>
        <ActionCard
          title="Users"
          img="/assets/default/defaultUser.png"
          desc={switchRender(msUser)}
        />
        <ActionCard
          title="Restaurant"
          img="/assets/default/defaultRestaurant.png"
          desc={switchRender(msRestaurant)}
        />
        <ActionCard
          title="Orders"
          img="/assets/default/defaultOrder.png"
          desc={switchRender(msOrder)}
        />
      </Container>
    </Section>
  );
};

MsPage.requireAuth = "technical";

export default MsPage;
