import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import s from "./ActionCard.module.scss";

interface Props {
  title: string;
  desc?: string;
  img: string;
}

const ActionCard: React.FC<Props> = ({ children, title, desc, img }) => (
  <Card className={s.container}>
    <CardMedia component="img" className={s.img} src={img} />
    <CardContent className={s.content}>
      <Typography variant="h5" className={s.title}>
        {title}
      </Typography>
      {desc && (
        <Typography variant="body2" className={s.desc}>
          {desc}
        </Typography>
      )}
    </CardContent>
    <CardActions className={s.button}>{children}</CardActions>
  </Card>
);

ActionCard.defaultProps = {
  desc: "",
};

export default ActionCard;
