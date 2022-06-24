import { AvatarInput, IRestaurant, TextInput } from "@ceseatslib/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  methods: UseFormReturn<IRestaurant, any>;
  restaurant?: IRestaurant;
}

const RestaurantForm: React.FC<Props> = ({ methods, restaurant }) => (
  <>
    <AvatarInput
      name="img"
      img={
        restaurant?.img
          ? restaurant.img
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
    />
    <TextInput
      name="description"
      label="Description"
      control={methods.control}
      defaultValue={restaurant?.description}
    />
  </>
);

RestaurantForm.defaultProps = {
  restaurant: undefined,
};

export default RestaurantForm;
