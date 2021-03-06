import {
  Container,
  TextField,
  Divider,
  MenuItem,
  Typography,
} from "@mui/material";
import { ProductCard } from "@ceseatslib/ui";
import s from "styles/Restaurants.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import axios from "axios";
import { LoadingPage } from "@ceseatslib/template";
import Head from "next/head";
import { ICartAction, useStore } from "src/utils/hooks";

interface IAddress {
  id: string;
  designation?: string;
  label: string;
  latitude: number;
  longitude: number;
}

const Restaurants = () => {
  const { createNotification } = useNotificationCenter();
  const { dispatchCart } = useStore();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);

  useEffect(() => {
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
  }, []);

  const handleAddress = (address: IAddress) => {
    setSelectedAddress(address);
    axios
      .get(
        `${process.env.API_RESTAURANT}?lat=${address.latitude}&lng=${address.longitude}`
      )
      .then(({ data }) => {
        dispatchCart({
          type: ICartAction.SET_ADDRESS,
          payload: {
            address: {
              label: address.label,
              latitude: address.latitude,
              longitude: address.longitude,
            },
          },
        });
        setRestaurants(data);
      })
      .catch(() => {
        setRestaurants([]);
        createNotification(
          INotificationType.ERROR,
          "Erreur, veuillez réessayer plus tard"
        );
      });
  };

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Clients - Restaurants</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  );
};

Restaurants.requireAuth = true;

export default Restaurants;
