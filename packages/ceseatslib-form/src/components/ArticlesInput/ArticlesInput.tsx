import { Button, Container, Divider, Typography } from "@mui/material";
import React from "react";
import { Control, useFieldArray } from "react-hook-form";
import { useEffectOnce } from "@ceseatslib/utils";
import CancelIcon from "@mui/icons-material/Cancel";
import { TextInput } from "../TextInput";
import s from "./ArticlesInput.module.scss";
import { IArticle, IMenuContent } from "../../validations";
import { ComboBoxInput } from "../ComboBoxInput";

interface ArticlesInputProps {
  name: string;
  control: Control<any, any>;
  articles: IArticle[];
  defaultValue?: IMenuContent[];
  className?: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  inputProps?: any;
}

const ArticlesInput: React.FC<ArticlesInputProps> = ({
  name,
  defaultValue,
  inputProps,
  className,
  control,
  articles,
  ...textFieldProps
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  useEffectOnce(() => {
    if (defaultValue) {
      for (let i = 0; i < defaultValue?.length; i += 1) {
        append({
          sectionName: defaultValue[i].sectionName,
          articles: articles.filter((art) =>
            defaultValue[i].articles.includes(art.id ? art.id : "")
          ),
        });
      }
    }
  });

  return (
    <>
      <Container>
        {fields.map((el, index) => (
          <Container key={el.id}>
            <Divider sx={{ margin: "10px auto 30px", width: "25%" }} />
            <Container className={s.section_title}>
              <Typography variant="h6">Section n°{index}</Typography>
              <Button onClick={() => remove(index)}>
                <CancelIcon color="error" />
              </Button>
            </Container>
            <TextInput
              label="Nom"
              control={control}
              name={`${name}.${index}.sectionName`}
              fullWidth
              defaultValue=""
              {...textFieldProps}
            />
            <ComboBoxInput
              options={articles}
              getOptionLabel={(option) => option.name}
              multiple
              control={control}
              name={`${name}.${index}.articles`}
              label="Articles *"
            />
          </Container>
        ))}
      </Container>
      <Container className={s.new_section}>
        <Button
          type="button"
          variant="outlined"
          color="success"
          onClick={() => append({})}
        >
          Ajouter une section
        </Button>
      </Container>
    </>
  );
};

ArticlesInput.defaultProps = {
  defaultValue: [],
  type: "text",
  multiline: false,
  required: false,
  inputProps: {},
  className: "",
};

export default ArticlesInput;
