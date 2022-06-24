import { AvatarInput, IArticle, Select, TextInput } from "@ceseatslib/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import s from "styles/Article.module.scss";

interface Props {
  methods: UseFormReturn<IArticle, any>;
  product?: IArticle;
}

const ArticleForm: React.FC<Props> = ({ methods, product }) => (
  <>
    <AvatarInput
      name="image"
      img={
        product?.image ? product.image : "/assets/default/defaultArticle.png"
      }
      control={methods.control}
      watch={methods.watch}
      setValue={methods.setValue}
    />
    <TextInput
      name="name"
      label="Nom"
      control={methods.control}
      defaultValue={product?.name}
      required
    />
    <TextInput
      name="description"
      label="Description"
      control={methods.control}
      defaultValue={product?.description}
    />
    <TextInput
      name="price"
      type="number"
      label="Price"
      inputProps={{ inputProps: { min: 0 } }}
      control={methods.control}
      defaultValue={product?.price}
      required
    />
    <Select
      name="isAvailable"
      label="Disponibilité"
      control={methods.control}
      className={s.select}
      defaultValue={product?.isAvailable}
      chooses={[
        { value: true, label: "Oui" },
        { value: false, label: "Non" },
      ]}
    />
  </>
);

ArticleForm.defaultProps = {
  product: undefined,
};

export default ArticleForm;
