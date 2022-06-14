/* eslint-disable @next/next/no-img-element */
import { ReactElement } from "react";
// import s from "./Card.module.scss";

interface CardProps {
  src: string;
  alt: string;
}

export const Card = ({ src, alt }: CardProps): ReactElement => (
  <div>
    <img src={src} alt={alt} />
  </div>
);
