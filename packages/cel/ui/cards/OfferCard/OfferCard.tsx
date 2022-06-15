import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import s from "./OfferCard.module.scss";

interface Props {
  img: {
    src: string;
  };
  title: string;
  description: string;
  link: {
    text: string;
    href: string;
  };
  reverse?: boolean;
}

const OfferCard: React.FC<Props> = ({
  img: { src },
  title,
  description,
  link: { text, href },
  reverse,
}) => (
  <Card className={`${s.container} ${reverse ? s.reverse : ""}`}>
    <CardMedia component="img" src={src} />
    <CardContent>
      <Typography variant="h4" textAlign={reverse ? "right" : "justify"}>
        {title}
      </Typography>
      <Typography variant="body2" textAlign={reverse ? "right" : "justify"}>
        {description}
      </Typography>
      <CardActions className={s.link}>
        <ArrowForwardIcon color="primary" className={s.icon} />
        <Link href={href}>
          <Typography variant="body2" color="primary">
            {text}
          </Typography>
        </Link>
      </CardActions>
    </CardContent>
  </Card>
);

OfferCard.defaultProps = {
  reverse: false,
};

export default OfferCard;
