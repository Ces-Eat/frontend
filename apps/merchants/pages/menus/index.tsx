import { Section } from "@ceseatslib/template";
import { Button, Container } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";
import { useStore } from "src/utils/hooks";
import { useRouter } from "next/router";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const MenusPage = () => {
  const router = useRouter();
  const {
    restaurant: {
      restaurant: { menus },
    },
  } = useStore();

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nom",
      minWidth: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 250,
      editable: true,
    },
    {
      field: "price",
      headerName: "Prix",
      type: "number",
      minWidth: 50,
      renderCell: (params) => `${params.value} €`,
      editable: true,
    },
    {
      field: "isAvailable",
      headerName: "Disponibilité",
      minWidth: 110,
      editable: true,
      renderCell: (params) =>
        params.row.isAvailable ? (
          <CheckBoxIcon color="success" />
        ) : (
          <CancelIcon color="error" />
        ),
    },
  ];

  return (
    <Section title="Menus">
      <Container
        sx={{ height: "70vh", width: "80%", maxWidth: "610px !important" }}
      >
        <DataGrid
          sx={{ ".MuiDataGrid-row": { cursor: "pointer" } }}
          getRowId={(row) => row._id}
          rows={menus}
          columns={columns}
          isCellEditable={() => false}
          onRowClick={(row) => router.push(`/menus/${row.id}`)}
        />
        <Container
          sx={{
            margin: "15px auto",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="/menus/new">
            <Button color="primary" variant="outlined">
              Ajouter un menu
            </Button>
          </Link>
        </Container>
      </Container>
    </Section>
  );
};

MenusPage.requireAuth = "restaurant";

export default MenusPage;
