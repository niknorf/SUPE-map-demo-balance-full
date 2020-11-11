import {
  Typography,
  TableRow,
  TableCell,
  Link,
  Grid,
  Icon,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import TableTemplate from "./TableTemplate";
import Contex from "../store/context";
import InfoWindow from "./InfoWindow.js";
import balance_group_items from "../data/balance_result_full_full.json";
import bubd from "../data/bu_bd.json";
import grey from "../img/grey-dot.svg";
import orange from "../img/orange-dot.svg";
import yellow from "../img/yellow-dot.svg";
import red from "../img/red-dot.svg";

const useStyles = makeStyles((theme) => ({
  imageIcon: {
    width: 16,
    height: 16,
  },
}));

function createData(id, address, probability, link, icon) {
  return { id, address, probability, link, icon };
}

const BDProbability = () => {
  const classes = useStyles();
  const [rows, setBgContent] = useState([]);
  const { globalState } = useContext(Contex);

  useEffect(() => {
    if (globalState.balance_index !== "") {
      // fetch("/api/Results/GetBalanceResultFull/" + globalState.balance_index)
      //   .then((res) => res.json())
      //   .then(
      // (result) => {
      createRowsData();
      // },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      // (error) => {
      // setLoading(true);
      // setError(error);
      // }
      // );
    }
    // setLoading(true);
  }, [globalState.balance_index]);

  const BalanceGroupContentRows = (row) => {
    return (
      <TableRow key={row.id} style={{ lineHeight: '14px' }}>
        <TableCell component="th" scope="row" style={{ width: 200 }}>
          {row.address}
        </TableCell>
        <TableCell style={{ width: 140, fontWeight: 'bold' }} align="right">
          <Icon>
            <img className={classes.imageIcon} src={row.icon} alt="" />
          </Icon>
          {row.probability}%
        </TableCell>
        <TableCell style={{ width: 100 }} align="right">
          {/* href="guaranteedsuppliers" numeric component="a" */}
          <Link
            component="button"
            variant="body2"
            underline="always"
            color="primary"
            onClick={() => {
              /*redirect to tasks*/
            }}
          >
            {row.link}
          </Link>
        </TableCell>
      </TableRow>
    );
  };

  const tableColumns = [
    {
      id: "address",
      numeric: false,
      disablePadding: false,
      label: "Адрес",
    },
    {
      id: "probability",
      numeric: true,
      disablePadding: false,
      label: "Вероятность БУ/БД",
    },
    {
      id: "link",
      numeric: false,
      disablePadding: false,
      label: "",
    },
  ];

  const createRowsData = () => {
    let temp = [];

    for (var i = 0; i < balance_group_items.length; i++) {
      for (var j = 0; j < bubd.length; j++) {
        let icon = grey;
        if (balance_group_items[i].branch_id === bubd[j].fias_id) {
          if (bubd[j].percent_probability_BU > 66) {
            icon = red;
          } else if (bubd[j].percent_probability_BU > 33) {
            icon = orange;
          } else if (bubd[j].percent_probability_BU > 1) {
            icon = yellow;
          } else {
            icon = grey;
          }
          //TODO chnage dynamicallt to BU BD
          temp.push(
            createData(
              i,
              bubd[j].address,
              bubd[j].percent_probability_BU,
              "Создать задание",
              icon
            )
          );
        }
      }
    }

    setBgContent(temp);
  };

  return rows.length > 0
    ? [
        <TableTemplate
          rows={rows}
          columns={tableColumns}
          rowsSettings={BalanceGroupContentRows}
        />,
      ]
    : [
        <InfoWindow
          label="Проверить топологию сети - привязку ПУ"
          icon="info"
        />,
      ];
};

export { BDProbability };
