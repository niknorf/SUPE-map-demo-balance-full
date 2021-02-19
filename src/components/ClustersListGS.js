import { TableRow, TableCell } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import TableTemplate from "./TableTemplate";
import Contex from "../store/context";
import InfoWindow from "./InfoWindow.js";

const useStyles = makeStyles((theme) => ({}));

const GaranteedSuppliesClusters = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const { globalState } = useContext(Contex);

  useEffect(() => {
    if (globalState.fiasId !== "") {
      fetch("/api/Results/GetFiasClusterMedian/" + globalState.fiasId)
        .then((res) => res.json())
        .then(
          (result) => {
            let modified_result = result.clusters;
            modified_result.push({
              cluster: "общее",
              value: result.fias_median,
            });
            setRows(modified_result);
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

  const GaranteedSuppliesClustersRows = (row) => {
    return (
      <TableRow key={row.cluster}>
        <TableCell component="th" scope="row" align="left">
          {row.cluster}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.value}
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
    {
      id: "value",
      numeric: true,
      disablePadding: false,
      label: "Значение, кВтч",
    },
  ];

  return rows.length > 0
    ? [
        <TableTemplate
          rowsPerPage={5}
          rows={rows}
          columns={tableColumns}
          rowsSettings={GaranteedSuppliesClustersRows}
        />,
      ]
    : [<InfoWindow label="Нет данных" icon="info" />];
};

export { GaranteedSuppliesClusters };
