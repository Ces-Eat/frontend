import {
  IMenu,
  Select,
  TextInput,
  ArticlesInput,
  IArticle,
} from "@ceseatslib/form";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  methods: UseFormReturn<IMenu, any>;
  menu?: IMenu;
  articles: IArticle[];
}

const MenuForm: React.FC<Props> = ({ methods, menu, articles }) => (
  <>
    <TextInput
      name="name"
      label="Nom"
      control={methods.control}
      defaultValue={menu?.name || ""}
      fullWidth
      required
    />
    <TextInput
      name="description"
      label="Description"
      control={methods.control}
      defaultValue={menu?.description || ""}
      fullWidth
    />
    <TextInput
      name="price"
      type="number"
      label="Price"
      InputProps={{ inputProps: { min: 0 } }}
      control={methods.control}
      defaultValue={menu?.price || 0}
      fullWidth
      required
    />
    <Select
      name="isAvailable"
      label="Disponibilit√©"
      control={methods.control}
      defaultValue={(menu && menu.isAvailable) || true}
      fullWidth
      required
      chooses={[
        { value: true, label: "Oui" },
        { value: false, label: "Non" },
      ]}
    />
    <ArticlesInput
      name="content"
      control={methods.control}
      articles={articles}
      defaultValue={menu?.content || []}
      required
    />
  </>
);

MenuForm.defaultProps = {
  menu: undefined,
};

export default MenuForm;
