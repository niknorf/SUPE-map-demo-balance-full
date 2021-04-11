import { TableRow, TableCell } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import TableTemplate from "components/TableTemplate";
import Contex from "store/context";
import InfoWindow from "components/InfoWindow.js";
import ServicesGS from "pages/GuaranteedSuppliers/api/ServicesGS";

const useStyles = makeStyles(theme => ({}));

const GaranteedSuppliesClusters = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const { globalState } = useContext(Contex);

  useEffect(() => {
    if (globalState.fiasId !== "") {
      ServicesGS.getFiasClusters(globalState.fiasId)
        .then(result => {
          if (result.length) {
            setRows(result);
          }
        })
        .catch(error => {});
    }
    // setLoading(true);
  }, [globalState.fiasId]);

  const GaranteedSuppliesClustersRows = row => {
    return (
      <TableRow key={row.cons_name}>
        <TableCell component="th" scope="row" align="left">
          {row.cons_name}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.value}
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {row.cluster}
        </TableCell>
        <TableCell component="th" scope="row" align="right">
          {row.deviation}
        </TableCell>
      </TableRow>
    );
  };

  const tableColumns = [
    {
      id: "cons_name",
      numeric: false,
      disablePadding: false,
      label: "Название ЮЛ"
    },
    {
      id: "value",
      numeric: true,
      disablePadding: false,
      label: "Потребление, кВтч"
    },
    {
      id: "cluster",
      numeric: false,
      disablePadding: false,
      label: "Кластер"
    },
    {
      id: "deviation",
      numeric: true,
      disablePadding: false,
      label: "Отклонение от кластера, %"
    }
  ];

  return rows.length > 0
    ? [
        <TableTemplate
          rowsPerPage={6}
          rows={rows}
          columns={tableColumns}
          rowsSettings={GaranteedSuppliesClustersRows}
        />
      ]
    : [<InfoWindow label="Нет данных" icon="info" />];
};

export { GaranteedSuppliesClusters };
