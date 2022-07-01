import { Section } from "@ceseatslib/template";
import { Container } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

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

const MonitoringPage = () => {
  const [orders, setOrders] = useState([]);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      axios
        .get(`${process.env.API_ORDERS}`, { withCredentials: true })
        .then(({ data }) => {
          setOrders(data);
        })
        .catch(() => {
          console.log("error");
        });
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "UserId",
      minWidth: 150,
      editable: true,
    },
    {
      field: "restaurant",
      headerName: "Restaurant",
      valueGetter: (params) => params.row.restaurant.name,
      minWidth: 150,
      editable: true,
    },
    {
      field: "driverId",
      headerName: "DriverId",
      valueGetter: (params) => params.row.driver?._id,
      minWidth: 200,
      editable: true,
    },
    {
      field: "orderStatus",
      headerName: "Status",
      valueGetter: (params) => params.row.orderStatus.title,
      minWidth: 450,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Crée le",
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
    <>
      <Head>
        <title>Staff - Monitoring</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section title="Monitoring">
        <Container sx={{ height: "70vh", width: "80%" }}>
          <DataGrid
            rows={orders}
            columns={columns}
            getRowId={(row) => row._id}
            isCellEditable={() => false}
          />
        </Container>
      </Section>
    </>
  );
};

MonitoringPage.requireAuth = "commercial";

export default MonitoringPage;