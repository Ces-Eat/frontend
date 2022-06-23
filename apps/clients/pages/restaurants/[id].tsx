// import { useRouter } from "next/router";
import React from "react";
import { Container } from "@mui/material";
import RestaurantHeader from "@components/restaurant/Header/Header";
import Category from "@components/restaurant/Category/Category";
import s from "@styles/Restaurant.module.scss";
import { Divider } from "@mui/material";

const Restaurant: React.FC = () => {
  // const router = useRouter();
  // const { id } = router.query;

  const restaurant = {
    title: "Burker king",
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    rating: 4.5,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  };

  const categories = [
    {
      id: "cat_eiheiqz",
      name: "Boissons",
    },
    {
      id: "cat_sfs",
      name: "Plats",
    },
    {
      id: "cat_fe55555555555",
      name: "Menu",
    },
    {
      id: "iqojdepozq",
      name: "Don't show",
    },
  ];

  const products = [
    {
      id: "1",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      desc: "2.4 €",
      name: "Berre Guère",
      cat: "cat_eiheiqz",
    },
    {
      id: "2",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      desc: "2.4 €",
      name: "Berre Guère vB",
      cat: "cat_sfs",
    },
    {
      id: "3",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      desc: "2.4 €",
      name: "Berre Guère v3",
      cat: "cat_fe55555555555",
    },
    {
      id: "4",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      desc: "2.4 €",
      name: "Berre Guère v4",
      cat: "cat_fe55555555555",
    },
  ];

  return (
    <>
      <RestaurantHeader {...restaurant} />
      <Container className={s.container}>
        {categories.map((category, i) => {
          const productCat = products.filter(
            (product) => product.cat === category.id
          );

          return (
            <>
              {productCat.length !== 0 && i !== 0 && (
                <Divider sx={{ width: "60%", margin: "20px auto" }} />
              )}
              <Category {...category} key={category.id} products={productCat} />
            </>
          );
        })}
      </Container>
    </>
  );
};

export default Restaurant;
