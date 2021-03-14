import { TableRow, TableCell } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import TableTemplate from "components/TableTemplate";
import Contex from "store/context";
import InfoWindow from "components/InfoWindow.js"

const useStyles = makeStyles((theme) => ({}));

const MeteringDevices = () => {
  const classes = useStyles();
  const [rows, setBgContent] = useState([]);
  const { globalState } = useContext(Contex);

  useEffect(() => {
    if (globalState.balance_index !== "") {
      fetch("/api/Results/GetBalanceGroupMeterpointsInfo/" + globalState.balance_index)
        .then((res) => res.json())
        .then(
          (result) => {
            if(Array.isArray(result) && result.length>0){
                setBgContent(result);
            }
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log(error);
            // setLoading(true);
            // setError(error);
          }
        );
    }
    // setLoading(true);
  }, [globalState.balance_index]);

  const ContentRows = (row) => {
    return (
      <TableRow key={row.meter_id}>
        <TableCell component="th" scope="row" style={{ width: 100 }}>
          {row.serial}
        </TableCell>
        <TableCell style={{ width: 200 }} align="left">
          {row.caption}
        </TableCell>
      </TableRow>
    );
  };

  const tableColumns = [
    {
      id: "name",
      numeric: true,
      disablePadding: false,
      label: "Прибор учета (серийный номер)",
    },
    {
      id: "type",
      numeric: false,
      disablePadding: false,
      label: "Место установки",
    },
  ];

  return (
    rows.length >0 ? [
      <TableTemplate
      rows={rows}
      columns={tableColumns}
      rowsSettings={ContentRows}
    />
  ] : [
      <InfoWindow label="Проверить топологию сети - привязку ПУ" icon="info" />
  ]
  );
};

export { MeteringDevices };
