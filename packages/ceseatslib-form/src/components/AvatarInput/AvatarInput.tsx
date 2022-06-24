import { Container } from "@mui/material";
import React, { useRef } from "react";
import {
  Control,
  useController,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import s from "./AvatarInput.module.scss";

interface Props {
  img?: string;
  name: string;
  control: Control<any, any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  accept?: string;
}

const AvatarInput: React.FC<Props> = ({
  img,
  name,
  accept,
  control,
  watch,
  setValue,
}) => {
  const inputRef = useRef(null);
  const { field } = useController({
    name,
    control,
    defaultValue: img,
  });

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
      ) && <CancelIcon className={s.icon} color="error" onClick={deleteImg} />}
    </Container>
  );
};

AvatarInput.defaultProps = {
  accept: "image/*",
  img: "",
};

export default AvatarInput;
