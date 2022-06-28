import { Container, TextField, Divider, MenuItem } from "@mui/material";
import { ProductCard } from "@ceseatslib/ui";
import s from "styles/Restaurants.module.scss";
import Link from "next/link";
import { useState } from "react";
import {
  INotificationType,
  useEffectOnce,
  useNotificationCenter,
} from "@ceseatslib/utils";
import axios from "axios";
import { LoadingPage } from "@ceseatslib/template";

interface IAddress {
  id: string;
  designation?: string;
  label: string;
  latitude: number;
  longitude: number;
}

const Restaurants = () => {
  const { createNotification } = useNotificationCenter();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);

  useEffectOnce(() => {
    axios
      .get(`${process.env.API_ADDRESS}`, { withCredentials: true })
      .then(({ data }) => {
        setAddresses(data);
        setIsLoading(false);
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Erreur, veuillez réessayer plus tard"
        );
        setIsLoading(false);
      });
  });

  const handleAddress = (address: IAddress) => {
    console.log("change");
    setSelectedAddress(address);
  };

  const restaurants = [
    {
      _id: "62bacabd01a7fb8d33fabed4",
      name: "BARGUR KUNG",
      image: null,
      description: "",
      address: {
        label: "14 Boulevard ...",
        longitude: 5,
        latitude: 7,
      },
    },
    {
      _id: "62bacfabed4",
      name: "BARGUR KUNG",
      image: null,
      description: "",
      address: {
        label: "8 Rue ...",
        longitude: 5,
        latitude: 7,
      },
    },
    {
      _id: "62bacabd01a7fb8dabed4",
      name: "BARGUR KUNG",
      image: null,
      description: "",
      address: {
        label: "5 Impasse ...",
        longitude: 5,
        latitude: 7,
      },
    },
  ];

  if (isLoading) return <LoadingPage />;

  return (
    <Container className={s.container}>
      <Container className={s.input}>
        <TextField select label="Adresse" fullWidth defaultValue="">
          {addresses.map((address: IAddress) => (
            <MenuItem
              key={address.id}
              value={address.id}
              onClick={() => handleAddress(address)}
            >
              {address.designation || address.label}
            </MenuItem>
          ))}
          <Link href="/addresses/new">
            <MenuItem>Ajouter une adresse</MenuItem>
          </Link>
        </TextField>
        {selectedAddress && (
          <TextField
            label="Nom du restaurant"
            fullWidth
            sx={{ margin: "0" }}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </Container>
      {/* <Container className={s.filt_container}>
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
      </Container> */}
      {selectedAddress && (
        <>
          <Divider sx={{ width: "60%", margin: "20px auto" }} />
          <Container className={s.rest_container}>
            {restaurants.length
              ? restaurants
                  .filter(({ name }) => name.includes(search))
                  .map((restaurant) => (
                    <Link
                      href={`/restaurants/${restaurant._id}`}
                      key={restaurant._id}
                    >
                      <a
                        className={s.link}
                        href={`/restaurants/${restaurant._id}`}
                      >
                        <ProductCard
                          img="/assets/default/defaultRestaurant.png"
                          name={restaurant.name}
                          desc={restaurant.address.label}
                        />
                      </a>
                    </Link>
                  ))
              : "Aucun restaurant n'est disponible"}
          </Container>
        </>
      )}
    </Container>
  );
};

Restaurants.requireAuth = true;

export default Restaurants;
