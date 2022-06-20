import { Container } from "@mui/material";
import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import s from "./AvatarInput.module.scss";

interface Props {
  img: string;
  name: string;
  accept?: string;
}

const AvatarInput: React.FC<Props> = ({ img, name, accept }) => {
  const inputRef = useRef(null);
  const {
    control,
    watch,
    setValue,
    // formState: { errors },
  } = useFormContext();

  const currentImage = watch(name);

  const deleteImg = () => {
    setValue(name, undefined);
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.value = null;
    }
  };

  return (
    <Container className={s.container}>
      <Controller
        name={name}
        control={control}
        defaultValue={img}
        render={({ field }) => (
          <>
            <img
              src={
                typeof currentImage === "string" ||
                currentImage === undefined ||
                currentImage.length === 0
                  ? img
                  : URL.createObjectURL(currentImage[0])
              }
              alt="Avatar"
              className={s.img}
            />
            <input
              className={s.input}
              {...field}
              ref={inputRef}
              type="file"
              accept={accept}
              value={field.value.filename}
              onChange={(event) => field.onChange(event.target.files)}
            />{" "}
            {!(
              typeof currentImage === "string" ||
              currentImage === undefined ||
              currentImage.length === 0
            ) && (
              <CancelIcon
                className={s.icon}
                color="error"
                onClick={deleteImg}
              />
            )}
          </>
        )}
      />
    </Container>
  );
};

AvatarInput.defaultProps = {
  accept: "image/*",
};

export default AvatarInput;
