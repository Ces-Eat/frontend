import React, { useEffect, useState } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import { LoadingPage, Section } from "@ceseatslib/template";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import { Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const months = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];

const LogsPage = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { createNotification } = useNotificationCenter();

  useEffect(() => {
    setIsLoading(false);
    axios
      .get(`${process.env.API_LOGS}`)
      .then(({ data }) => {
        setClients(
          data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        );
        setIsLoading(false);
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Impossible de charger les logs"
        );
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingPage />;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "SessionId",
      minWidth: 200,
      editable: true,
    },
    {
      field: "userId",
      headerName: "UserId",
      minWidth: 200,
      editable: true,
    },
    {
      field: "valid",
      headerName: "Validité",
      minWidth: 80,
      editable: true,
      renderCell: (params) =>
        params.row.valid ? (
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <CheckBoxIcon color="success" />
          </Container>
        ) : (
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <CancelIcon color="error" />
          </Container>
        ),
    },
    {
      field: "userAgent",
      headerName: "Agent",
      minWidth: 600,
      editable: true,
    },
    {
      field: "updatedAt",
      headerName: "Dernière mise à jour",
      width: 250,
      editable: true,
      renderCell: (params) => {
        const d = new Date(params.value);
        const year = d.getFullYear();
        const date = d.getDate();
        const monthName = months[d.getMonth()];
        const dayName = days[d.getDay()];
        return `${dayName} ${date} ${monthName} ${year} à ${d.getHours()}h${d.getMinutes()}`;
      },
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

LogsPage.requireAuth = "technical";

export default LogsPage;
