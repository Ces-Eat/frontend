import { IUser } from "@ceseatslib/form";
import { LoadingPage, Section } from "@ceseatslib/template";
import {
  INotificationType,
  useEffectOnce,
  useNotificationCenter,
} from "@ceseatslib/utils";
import { Button, Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";

const HomePage = () => {
  const [clients, setClients] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { createNotification } = useNotificationCenter();

  useEffectOnce(() => {
    axios
      .get(`${process.env.API_USERS}`, { withCredentials: true })
      .then(({ data }) => {
        setClients(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  });

  if (isLoading) return <LoadingPage />;

  const handleSuspension = (id: string, suspensionStatus: boolean) => {
    axios
      .put(
        `${process.env.API_USERS}/${id}`,
        { isSuspended: suspensionStatus },
        { withCredentials: true }
      )
      .then(() => {
        setClients(clients.filter((client) => client));
      })
      .catch(() => {
        createNotification(INotificationType.ERROR, "Erreur suspension client");
      });
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`${process.env.API_USERS}/${id}`, { withCredentials: true })
      .then(() => {
        setClients(clients.filter((client) => client.id !== id));
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Erreur suppression client"
        );
      });
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Prénom",
      minWidth: 150,
      editable: true,
    },
    {
      field: "surname",
      headerName: "Nom",
      minWidth: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 110,
      editable: true,
    },
    {
      field: "roleName",
      headerName: "Type",
      valueGetter: (params) => params.row.role.name,
      width: 130,
      editable: true,
    },
    {
      field: "suspension",
      headerName: "Suspension",
      renderCell: (params) => {
        if (params.row.isSuspended === true && params.row.role.id === 1) {
          return (
            <Button
              variant="outlined"
              color="success"
              onClick={() =>
                handleSuspension(params.row.id, !params.row.isSuspended)
              }
            >
              Activer
            </Button>
          );
        }
        if (params.row.isSuspended === false && params.row.role.id === 1) {
          return (
            <Button
              variant="outlined"
              color="warning"
              onClick={() =>
                handleSuspension(params.row.id, !params.row.isSuspended)
              }
            >
              Suspendre
            </Button>
          );
        }
        return <div />;
      },
      width: 130,
      editable: true,
    },
    {
      field: "suppresion",
      headerName: "Suppresion",
      renderCell: (params) => {
        if (params.row.role.id === 1) {
          return (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              Supprimer
            </Button>
          );
        }
        return <div />;
      },
      width: 130,
      editable: true,
    },
  ];

  return (
    <Section title="Clients">
      <Container sx={{ height: "70vh", width: "80%" }}>
        <DataGrid
          rows={clients}
          columns={columns}
          isCellEditable={() => false}
        />
      </Container>
    </Section>
  );
};

HomePage.requireAuth = "commercial";

export default HomePage;
