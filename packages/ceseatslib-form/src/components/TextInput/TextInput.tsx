import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

interface TextInputProps {
  name: string;
  label: string;
  defaultValue?: string | number;
  className?: string;
  type?: string;
  multiline?: boolean;
  inputProps?: any;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  defaultValue,
  inputProps,
  className,
  ...textFieldProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...{ ...field, ...textFieldProps }}
          className={className}
          label={label}
          variant="outlined"
          error={!!errors[name]}
          helperText={errors[name]?.message}
          fullWidth
          InputProps={{ ...inputProps, style: { fontSize: 18 } }}
          InputLabelProps={{ style: { fontSize: 18 } }}
        />
      )}
    />
  );
};

TextInput.defaultProps = {
  defaultValue: "",
  type: "text",
  multiline: false,
  inputProps: {},
  className: "",
};

export default TextInput;
