import React, { MouseEventHandler } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import s from "./DescCard.module.scss";

interface Props {
  title: string;
  img: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isSelected?: boolean;
}

const DescCard: React.FC<Props> = ({ title, img, onClick, isSelected }) => (
  <Card
    className={`${s.container} ${onClick ? s.onClick : ""}`}
    onClick={onClick}
    sx={{
      backgroundColor: `${isSelected ? "tertiary.main" : "transparent"}`,
      boxShadow: "none",
    }}
  >
    <CardMedia component="img" className={s.img} src={img} />
    <CardContent className={s.content}>
      <Typography variant="mtb" className={s.title}>
        {title}
      </Typography>
    </CardContent>
  </Card>
);

DescCard.defaultProps = {
  onClick: undefined,
  isSelected: false,
};

export default DescCard;
