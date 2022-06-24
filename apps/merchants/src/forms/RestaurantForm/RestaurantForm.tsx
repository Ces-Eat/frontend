import {
  AddressInput,
  AvatarInput,
  IRestaurant,
  TextInput,
} from "@ceseatslib/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  methods: UseFormReturn<IRestaurant, any>;
  restaurant?: IRestaurant;
}

const RestaurantForm: React.FC<Props> = ({ methods, restaurant }) => (
  <>
    <AvatarInput
      name="image"
      img={
        restaurant?.image
          ? restaurant.image
          : "/assets/default/defaultRestaurant.png"
      }
      control={methods.control}
      watch={methods.watch}
      setValue={methods.setValue}
    />
    <TextInput
      name="name"
      label="Nom"
      control={methods.control}
      defaultValue={restaurant?.name}
      required
    />
    <TextInput
      name="description"
      label="Description"
      control={methods.control}
      defaultValue={restaurant?.description}
    />
    <AddressInput methods={methods} name="address" label="Adresse" required />
  </>
);

RestaurantForm.defaultProps = {
  restaurant: undefined,
};

export default RestaurantForm;
