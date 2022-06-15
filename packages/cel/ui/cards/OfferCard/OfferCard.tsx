import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";

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
}

const OfferCard: React.FC<Props> = ({
  img: { src },
  title,
  description,
  link: { text, href },
}) => (
  <Card>
    <CardMedia src={src} />
    <CardContent>
      <Typography>{title}</Typography>
      <Typography>{description}</Typography>
      <CardActions>
        <Link href={href}>{text}</Link>
      </CardActions>
    </CardContent>
  </Card>
);

export default OfferCard;
