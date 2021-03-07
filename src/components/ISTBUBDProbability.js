import {
  TableRow,
  TableCell,
  Link,
  Icon,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import TableTemplate from "./TableTemplate";
import Contex from "../store/context";
import InfoWindow from "./InfoWindow.js";
import bubd from "../data/BU_BD_v3.json";
import grey from "../img/grey-dot.svg";
import orange from "../img/orange-dot.svg";
import yellow from "../img/yellow-dot.svg";
import red from "../img/red-dot.svg";
import AddTaskDialog from "./AddTaskDialog.js"

const useStyles = makeStyles((theme) => ({
  imageIcon: {
    width: 16,
    height: 16,
  },
}));

function createData(id, address, fias_id, probability, link, icon) {
  return { id, address, fias_id, probability, link, icon };
}

const BDProbability = () => {
  const classes = useStyles();
  const [rows, setBgContent] = useState([]);
  const [openDialog, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const { globalState } = useContext(Contex);

  const handleDialogOpen = (row) => {
    console.log(row);
    setOpen(true);
    setDialogData(row);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setDialogData({});
  };

  useEffect(() => {
    if (globalState.balance_index !== "") {
      fetch("/api/Results/GetBalanceResultFull/" + globalState.balance_index)
        .then((res) => res.json())
        .then(
          (result) => {
            createRowsData(result);
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
  }, [globalState.balance_index]);

  const BalanceGroupContentRows = (row) => {
    return (
      <TableRow key={row.id} style={{ lineHeight: "14px" }}>
        <TableCell component="th" scope="row" style={{ width: 200 }}>
          {row.address}
        </TableCell>
        <TableCell style={{ width: 140, fontWeight: "bold" }} align="right">
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
            handleDialogOpen(row);
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

  const createRowsData = (balance_group_items) => {
    let temp = [];

    for (var i = 0; i < balance_group_items.length; i++) {
      for (var j = 0; j < bubd.length; j++) {
        let icon = grey;
        if (
          balance_group_items[i].type === "ConsumerBuilding" &&
          typeof balance_group_items[i].fias !== "undefined"
        ) {
          if (balance_group_items[i].fias === bubd[j].fias_id) {
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
                bubd[j].fias_id,
                bubd[j].percent_probability_BU,
                "Создать задание",
                icon
              )
            );
          }
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
          orderBy="probability"
          order="desc"
        />,
        <AddTaskDialog
        isDialogOpen={openDialog}
        closeDialog={handleDialogClose}
        dialogData={dialogData}
      />
      ]
    : [
        <InfoWindow
          label="Проверить топологию сети - привязку ПУ"
          icon="info"
        />,
      ];
};

export { BDProbability };
