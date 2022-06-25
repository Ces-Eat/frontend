import React, { ReactNode } from "react";
import { useController, Control } from "react-hook-form";
import { TextField } from "@mui/material";

export interface TextInputProps {
  name: string;
  label: string;
  control: Control<any, any>;
  className?: string;
  defaultValue: string | number | boolean;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  InputProps?: any;
  fullWidth?: boolean;
  children?: ReactNode;
  select?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  defaultValue,
  control,
  children,
  ...textFieldProps
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <TextField
      {...textFieldProps}
      {...field}
      variant="standard"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      // InputLabelProps={{ style: { fontSize: 18 } }}
    >
      {children}
    </TextField>
  );
};

TextInput.defaultProps = {
  type: "text",
  multiline: false,
  required: false,
  InputProps: undefined,
  className: undefined,
  fullWidth: false,
  children: undefined,
  select: false,
};

export default TextInput;
