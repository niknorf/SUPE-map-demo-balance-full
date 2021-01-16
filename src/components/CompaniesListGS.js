import { TableRow, TableCell } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import TableTemplate from "./TableTemplate";
import Contex from "../store/context";
import InfoWindow from "./InfoWindow.js"

const useStyles = makeStyles((theme) => ({}));

function createData(id, name) {
  return { id, name};
}

const GaranteedSuppliesCompanies = () => {
  const classes = useStyles();
  const [rows, setGSContent] = useState([]);
  const { globalState } = useContext(Contex);

  useEffect(() => {
    if (globalState.fiasId !== "") {
      fetch("/api/PSK/GetConsumersPSKData/" + globalState.fiasId)
        .then((res) => res.json())
        .then(
          (result) => {
            setGSContent(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            // setLoading(true);
            // setError(error);
          }
        );
    }
    // setLoading(true);
  }, [globalState.fiasId]);

  const GaranteedSuppliesCompaniesRows = (row) => {
    return (
      <TableRow key={row.name}>
        <TableCell component="th" scope="row"  align="left">
          {row.name}
        </TableCell>
      </TableRow>
    );
  };

  const tableColumns = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Название",
    },
  ];

  return (
    rows.length >0 ? [
    <TableTemplate
      rowsPerPage={12}
      rows={rows}
      columns={tableColumns}
      rowsSettings={GaranteedSuppliesCompaniesRows}
    />
  ] : [
      <InfoWindow label="Нет данных" icon="info" />
  ]
  );
};

export { GaranteedSuppliesCompanies };
