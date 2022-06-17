import type { NextPage } from "next";
import { Container, TextField, Typography } from "@mui/material";
import { ActionCard, DescCard } from "cel/ui/cards";
import s from "@styles/Restaurants.module.scss";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import { useState } from "react";

const Restaurants: NextPage = () => {
  const [search, setSearch] = useState("");
  const [catSelected, setCatSelected] = useState("");

  const restaurants = [
    {
      id: 1,
      img: "https://www.objectifgard.com/wp-content/uploads/2022/01/burger-king.jpeg",
      name: "Burker King",
      rating: 4.5,
      cat: "Fast Food",
    },
    {
      id: 2,
      img: "https://www.objectifgard.com/wp-content/uploads/2022/01/burger-king.jpeg",
      name: "Burger Kinga",
      cat: "Fast Food",
      rating: 4.5,
    },
    {
      id: 3,
      img: "https://www.objectifgard.com/wp-content/uploads/2022/01/burger-king.jpeg",
      name: "Burger King",
      cat: "Healthy",
      rating: 4.5,
    },
  ];

  const categories = [
    {
      id: "1",
      name: "Fast Food",
      img: "https://cdn-icons-png.flaticon.com/512/2819/2819194.png",
    },
    {
      id: "2",
      name: "Healthy",
      img: "https://cdn-icons-png.flaticon.com/512/1205/1205049.png",
    },
    {
      id: "3",
      name: "Fast",
      img: "https://cdn-icons-png.flaticon.com/512/2819/2819194.png",
    },
    {
      id: "4",
      name: "Hell",
      img: "https://cdn-icons-png.flaticon.com/512/1205/1205049.png",
    },
  ];

  return (
    <Container>
      <Container className={s.input}>
        <TextField
          label="Nom du restaurant"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
        />
      </Container>
      <Container className={s.filt_container}>
        {categories &&
          categories.map(({ id, name, img }) => (
            <DescCard
              className={name === catSelected ? s.selected : ""}
              key={id}
              onClick={() => setCatSelected(name === catSelected ? "" : name)}
              title={name}
              img={img}
            />
          ))}
      </Container>
      <Container className={s.rest_container}>
        {restaurants.length
          ? restaurants
              .filter(
                ({ name, cat }) =>
                  name.includes(search) &&
                  (catSelected === cat || catSelected === "")
              )
              .map(({ id, name, img, rating }) => (
                <Link href={`/restaurants/${id}`} key={id}>
                  <a className={s.link} href={`/restaurants/${id}`}>
                    <ActionCard title={name} img={img} desc={name}>
                      <Container className={s.rating}>
                        <Typography variant="body2">{rating}</Typography>{" "}
                        <StarIcon />
                      </Container>
                    </ActionCard>
                  </a>
                </Link>
              ))
          : "Aucun restaurant n'est disponible"}
      </Container>
    </Container>
  );
};

export default Restaurants;
