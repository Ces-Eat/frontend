import React from "react";
import { useController, Control } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

interface ComboBoxInputProps {
  name: string;
  label: string;
  control: Control<any, any>;
  defaultValue?: string;
  options: string[];
  onChange?: (e: any) => void;
}

const ComboBoxInput: React.FC<ComboBoxInputProps> = ({
  name,
  label,
  defaultValue,
  control,
  options,
  onChange,
  ...textFieldProps
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <Autocomplete
      {...{ ...field, ...textFieldProps }}
      disablePortal
      options={options}
      filterOptions={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="standard"
          onChange={onChange}
          error={!!fieldState.error}
          fullWidth
        />
      )}
    />
  );
};

ComboBoxInput.defaultProps = {
  defaultValue: "",
  onChange: undefined,
};

export default ComboBoxInput;
