import { Container, TextField, Divider } from "@mui/material";
import { DescCard, ProductCard } from "@ceseatslib/ui";
import s from "styles/Restaurants.module.scss";
import Link from "next/link";
import { useState } from "react";

const Restaurants = () => {
  const [search, setSearch] = useState("");
  const [catSelected, setCatSelected] = useState("");

  const restaurants = [
    {
      id: 1,
      img: "https://www.objectifgard.com/wp-content/uploads/2022/01/burger-king.jpeg",
      name: "Burker King",
      rating: 4.5,
      desc: "Lieux",
      cat: "Fast Food",
    },
    {
      id: 2,
      img: "https://www.objectifgard.com/wp-content/uploads/2022/01/burger-king.jpeg",
      name: "Burger Kinga",
      cat: "Fast Food",
      desc: "Lieux",
      rating: 4.5,
    },
    {
      id: 3,
      img: "https://www.objectifgard.com/wp-content/uploads/2022/01/burger-king.jpeg",
      name: "Burger King",
      cat: "Healthy",
      desc: "Lieux",
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
    <Container className={s.container}>
      <Container className={s.input}>
        <TextField
          label="Nom du restaurant"
          fullWidth
          sx={{ margin: "0" }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Container>
      <Container className={s.filt_container}>
        {categories &&
          categories.map(({ id, name, img }) => (
            <DescCard
              isSelected={name === catSelected}
              key={id}
              onClick={() => setCatSelected(name === catSelected ? "" : name)}
              title={name}
              img={img}
            />
          ))}
      </Container>
      <Divider sx={{ width: "60%", margin: "20px auto" }} />
      <Container className={s.rest_container}>
        {restaurants.length
          ? restaurants
              .filter(
                ({ name, cat }) =>
                  name.includes(search) &&
                  (catSelected === cat || catSelected === "")
              )
              .map((restaurant) => (
                <Link
                  href={`/restaurants/${restaurant.id}`}
                  key={restaurant.id}
                >
                  <a className={s.link} href={`/restaurants/${restaurant.id}`}>
                    <ProductCard {...restaurant} />
                  </a>
                </Link>
              ))
          : "Aucun restaurant n'est disponible"}
      </Container>
    </Container>
  );
};

Restaurants.requireAuth = true;

export default Restaurants;
