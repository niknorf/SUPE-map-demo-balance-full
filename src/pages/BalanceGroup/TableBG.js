import {
  TableRow,
  TableCell,
  useMediaQuery,
  Typography
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import TableTemplate from "components/TableTemplate";
import { Link } from "react-router-dom";
import Contex from "store/context";
import InfoWindow from "components/InfoWindow.js";

const BalanceGroupTable = props => {
  const classes = useStyles();
  const [rows, setBgContent] = useState([]);
  const { globalState, globalDispach } = useContext(Contex);

  let rowsPerPage = 12;
  let width = useWidth();

  width === "md" ? (rowsPerPage = 10) : (rowsPerPage = 11);

  useEffect(() => {
    fetch("/api/Results/GetResImbalanceFrontKWH")
      .then(res => res.json())
      .then(
        result => {
          setBgContent(result);
        },
        error => {
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
      label: "Балансовая группа"
    },
    {
      id: "imbalance_percent",
      numeric: true,
      disablePadding: true,
      label: "Небалансы (%)"
    },
    {
      id: "imbalance_kwh",
      numeric: true,
      disablePadding: false,
      label: "Небалансы (кВтч)"
    }
  ];
  const BalanceTableRows = row => {
    return (
      <TableRow
        key={row.balance_id}
        hover
        onClick={event => handleRowClick(event, row)}
      >
        <TableCell
          component="th"
          scope="row"
          style={{ width: 400 }}
          align="left"
        >
          Балансовая группа №{row.balance_id}
          <Typography className={classes.subText}>{row.name}</Typography>
        </TableCell>
        <TableCell style={{ width: 40 }} align="right">
          {(Math.round(Number(row.imbalance_percent) * 100) / 100).toFixed(2)}
        </TableCell>
        <TableCell style={{ width: 40 }} align="right">
          {(Math.round(Number(row.imbalance_kwh) * 100) / 100).toFixed(2)}
        </TableCell>
      </TableRow>
    );
  };

  const handleRowClick = (event, row) => {
    globalDispach({
      isPhantomic: false,
      balance_index: row.balance_id,
      isClean: row.is_clean,
      objSelected: true,
      building_address: "",
      obj_from: "table_click",
      isInPSK: false
    });
  };

  return rows.length > 0
    ? [
        <TableTemplate
          rows={rows}
          columns={tableColumns}
          rowsSettings={BalanceTableRows}
          rowsPerPage={rowsPerPage}
          order="asc"
          orderBy="balance_id"
        />
      ]
    : [<InfoWindow label="Нет данных" icon="info" />];
};

const BalanceGroupTop5Table = () => {
  const [rows, setBgData] = useState([]);
  const classes = useStyles();
  const { globalState, globalDispach } = useContext(Contex);

  let rowsPerPage = 5;

  useEffect(() => {
    fetch("/api/Results/GetResImbalanceFrontKWH")
      .then(res => res.json())
      .then(
        result => {
          result.sort((a, b) =>
            a.imbalance_percent < b.imbalance_percent ? 1 : -1
          );
          setBgData(result.splice(0, 5));
        },
        error => {
          // setLoading(true);
          // setError(error);
        }
      );
    // setLoading(true);
  }, []);

  const tableColumns = [
    {
      id: "balance_id",
      numeric: false,
      disablePadding: false,
      label: "Балансовая группа"
    },
    {
      id: "imbalance_percent",
      numeric: true,
      disablePadding: true,
      label: "Небалансы (%)"
    },
    {
      id: "imbalance_kwh",
      numeric: true,
      disablePadding: false,
      label: "Небалансы (кВтч)"
    }
  ];
  const BalanceTableRows = (row, print) => {
    return (
      <TableRow
        key={row.balance_id}
        hover
        classes={{ hover: classes.rowHover }}
        onClick={event => handleRowClick(event, row)}
        // Set to undefined if the table goes to print, because otherwise it will print in one line
        component={print === "print" ? undefined : Link}
        to="/balancegroup"
      >
        <TableCell
          component="th"
          scope="row"
          style={{ width: 400 }}
          align="left"
        >
          Балансовая группа №{row.balance_id}
          <Typography className={classes.subText}>{row.name}</Typography>
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
      isPhantomic: false,
      balance_index: row.balance_id,
      isClean: row.is_clean,
      objSelected: true,
      building_address: "",
      obj_from: "table_click",
      isInPSK: false
    });
  };

  return rows.length > 0
    ? [
        <TableTemplate
          rows={rows}
          columns={tableColumns}
          rowsSettings={BalanceTableRows}
          rowsPerPage={5}
        />
      ]
    : [<InfoWindow label="Нет данных" icon="info" />];
};
const useStyles = makeStyles(theme => ({
  rowHover: {
    "&:hover": {
      cursor: "pointer"
    },
    textDecoration: "none"
  },
  subText: {
    fontSize: "11px",
    lineHeight: "13px",
    letterSpacing: "0.01em",
    color: "#818E9B"
  }
}));

export { BalanceGroupTop5Table, BalanceGroupTable };
