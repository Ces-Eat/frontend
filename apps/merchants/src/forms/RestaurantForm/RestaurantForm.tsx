import { AddressInput, IRestaurant, TextInput } from "@ceseatslib/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  methods: UseFormReturn<IRestaurant, any>;
  restaurant?: IRestaurant;
}

const RestaurantForm: React.FC<Props> = ({ methods, restaurant }) => (
  <>
    {/* <AvatarInput
      name="image"
      img={
        restaurant?.image
          ? restaurant.image
          : "/assets/default/defaultRestaurant.png"
      }
      control={methods.control}
      watch={methods.watch}
      setValue={methods.setValue}
      clear={methods.clearErrors}
    /> */}
    <TextInput
      name="name"
      label="Nom"
      control={methods.control}
      defaultValue={restaurant?.name || ""}
      fullWidth
      required
    />
    <TextInput
      name="description"
      label="Description"
      control={methods.control}
      defaultValue={restaurant?.description || ""}
      fullWidth
    />
    <AddressInput
      methods={methods}
      defaultValue={restaurant?.address || undefined}
      name="address"
      label="Adresse *"
    />
  </>
);

RestaurantForm.defaultProps = {
  restaurant: undefined,
};

export default RestaurantForm;
