import React, { MouseEventHandler } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import s from "./DescCard.module.scss";

interface Props {
  title: string;
  img: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

const DescCard: React.FC<Props> = ({ title, img, onClick, className }) => (
  <Card
    className={`${s.container} ${className} ${onClick ? s.onClick : ""}`}
    onClick={onClick}
  >
    <CardMedia component="img" className={s.img} src={img} />
    <CardContent className={s.content}>
      <Typography variant="h5" className={s.title}>
        {title}
      </Typography>
    </CardContent>
  </Card>
);

DescCard.defaultProps = {
  onClick: undefined,
  className: "",
};

export default DescCard;
