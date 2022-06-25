import React from "react";
import { MenuItem } from "@mui/material";
import TextInput, { TextInputProps } from "../TextInput/TextInput";

interface SelectProps extends TextInputProps {
  chooses: {
    value: string | number | boolean;
    label: string | number;
  }[];
}

const Select: React.FC<SelectProps> = ({ chooses, ...selectFieldProps }) => (
  <TextInput {...selectFieldProps} select>
    {chooses.map((choose) => (
      <MenuItem key={choose.value.toString()} value={choose.value.toString()}>
        {choose.label}
      </MenuItem>
    ))}
  </TextInput>
);

export default Select;
