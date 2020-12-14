import {
  Typography,
  TableRow,
  TableCell,
  Link,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import TableTemplate from "./TableTemplate";
import Contex from "../store/context";
import InfoWindow from "./InfoWindow.js";

const useStyles = makeStyles((theme) => ({}));

const BalanceGroupList = (props) => {
  const classes = useStyles();
  const [rows, setBgContent] = useState([]);
  const { globalState, globalDispach } = useContext(Contex);

  let rowsPerPage = 12;
  let width = useWidth();

  width === "md" ? (rowsPerPage = 10) : (rowsPerPage = 11);

  if(typeof props.rowsPerPage !== 'undefined'){
    rowsPerPage = props.rowsPerPage;
  }

  useEffect(() => {
    fetch("/api/Results/GetResImbalanceFrontKWH")
      .then((res) => res.json())
      .then(
        (result) => {
          setBgContent(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // setLoading(true);
          // setError(error);
        }
      );
    // setLoading(true);
  }, []);

  function useWidth() {
    const theme = useTheme();
    const keys = [...theme.breakpoints.keys].reverse();
    return (
      keys.reduce((output, key) => {
        const matches = useMediaQuery(theme.breakpoints.up(key));
        return !output && matches ? key : output;
      }, null) || "xs"
    );
  }

  const tableColumns = [
    {
      id: "balance_id",
      numeric: false,
      disablePadding: false,
      label: "Балансовая группа",
    },
    {
      id: "imbalancePercent",
      numeric: true,
      disablePadding: true,
      label: "Небалансы (%)",
    },
    {
      id: "imbalanceKwh",
      numeric: true,
      disablePadding: false,
      label: "Небалансы (кВтч)",
    },
  ];
  const BalanceTableRows = (row) => {
    return (
      <TableRow
        key={row.balance_id}
        hover
        onClick={(event) => handleRowClick(event, row)}
      >
        <TableCell component="th" scope="row" style={{ width: 400 }} align="left">
          Балансовая группа №{row.balance_id}
        </TableCell>
        <TableCell style={{ width: 40 }} align="right">
          {(Math.round(row.imbalance_percent * 100) / 100).toFixed(2)}
        </TableCell>
        <TableCell style={{ width: 40 }} align="right">
          {(Math.round(row.imbalance_kwh * 100) / 100).toFixed(2)}
        </TableCell>
      </TableRow>
    );
  };

  const handleRowClick = (event, row) => {

    globalDispach({
      type: "FILTERCOMPONENT",
      isLoggedIn: true, //TODO check the token
      isPhantomic: false,
      balance_index: row.balance_id,
      isClean: row.is_clean,
      objSelected: true,
      building_address: "",
      obj_from: "table_click",
      isInPSK: false,
    });
  };

  return rows.length > 0
    ? [
        <TableTemplate
          rows={rows}
          columns={tableColumns}
          rowsSettings={BalanceTableRows}
          rowsPerPage={rowsPerPage}
          topFive={props.topFive}
          order={props.order}
          orderBy={props.orderBy}
        />,
      ]
    : [<InfoWindow label="Нет данных" icon="info" />];
};

export { BalanceGroupList };
