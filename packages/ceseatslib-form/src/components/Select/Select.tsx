import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";

interface SelectProps {
  name: string;
  label: string;
  defaultValue?: string | number;
  className?: string;
  chooses: {
    value: string | number;
    label: string | number;
  }[];
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  defaultValue,
  chooses,
  className,
  ...selectFieldProps
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
        <FormControl className={className}>
          <InputLabel id={`${label.trim()}-label`}>{label}</InputLabel>
          <MuiSelect
            labelId={`${label.trim()}-label`}
            id={`${label}-id`}
            error={!!errors[name]}
            {...{ ...field, ...selectFieldProps }}
            label={label}
            variant="outlined"
            fullWidth
          >
            {chooses.map((choose) => (
              <MenuItem key={choose.value} value={choose.value}>
                {choose.label}
              </MenuItem>
            ))}
          </MuiSelect>
        </FormControl>
      )}
    />
  );
};

Select.defaultProps = {
  defaultValue: "",
  className: "",
};

export default Select;
