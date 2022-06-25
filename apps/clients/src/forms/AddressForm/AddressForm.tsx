import { AddressInput, IAddress, TextInput } from "@ceseatslib/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  methods: UseFormReturn<IAddress, any>;
  address?: IAddress;
}

const AddressForm: React.FC<Props> = ({ methods, address }) => (
  <>
    <TextInput
      name="designation"
      label="Désignation"
      control={methods.control}
      defaultValue={address?.designation}
    />
    <AddressInput
      methods={methods}
      defaultValue={address?.address}
      name="address"
      label="Adresse"
    />
  </>
);

AddressForm.defaultProps = {
  address: undefined,
};

export default AddressForm;
