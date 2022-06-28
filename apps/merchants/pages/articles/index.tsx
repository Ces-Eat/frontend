import { Section } from "@ceseatslib/template";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TablePagination,
  Button,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";

interface Column {
  id: "name" | "desc" | "img" | "cat" | "isAvailable";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "name",
    label: "Nom",
    minWidth: 170,
    align: "center",
  },
  {
    id: "desc",
    label: "Desc",
    minWidth: 80,
    align: "center",
  },
  {
    id: "img",
    label: "Img",
    minWidth: 80,
    align: "center",
  },
  {
    id: "cat",
    label: "Cat",
    minWidth: 120,
    align: "center",
  },
  {
    id: "isAvailable",
    label: "Disponibilité",
    minWidth: 40,
    align: "center",
  },
];

const ArticlesPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const products = [
    {
      id: "1",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      desc: "2.4 €",
      name: "Berre Guère",
      cat: "cat_eiheiqz",
      isAvailable: true,
    },
    {
      id: "2",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      desc: "2.4 €",
      name: "Berre Guère vB",
      cat: "cat_sfs",
      isAvailable: true,
    },
    {
      id: "3",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      desc: "2.4 €",
      name: "Berre Guère v3",
      cat: "cat_fe55555555555",
      isAvailable: false,
    },
    {
      id: "4",
      img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      desc: "2.4 €",
      name: "Berre Guère v4",
      cat: "cat_fe55555555555",
      isAvailable: true,
    },
  ];

  function renderSwitchCell(id: string, value: any) {
    switch (id) {
      case "img":
        return (
          <Avatar
            alt="test"
            src={value}
            sx={{ width: 56, height: 56, margin: "0 auto" }}
          />
        );
      case "isAvailable":
        return value ? (
          <CheckBoxIcon color="success" />
        ) : (
          <CancelIcon color="error" />
        );
      default:
        return value;
    }
  }

  return (
    <Section title="Articles">
      <TableContainer sx={{ width: "80%", maxWidth: "1000px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: "pointer" }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];

                    return (
                      <Link key={column.id} href={`/articles/${row.id}`}>
                        <TableCell align={column.align}>
                          {renderSwitchCell(column.id, value)}
                        </TableCell>
                      </Link>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Link href="/articles/new">
        <Button color="primary" variant="outlined">
          Ajouter un article
        </Button>
      </Link>
    </Section>
  );
};

ArticlesPage.requireAuth = "restaurant";

export default ArticlesPage;
