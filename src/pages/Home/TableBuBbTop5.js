import {
  TableCell,
  TableRow,
  Typography,
  Container,
  Icon
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import TableTemplate from "components/TableTemplate";
import InfoWindow from "components/InfoWindow.js";
import React, { useContext, useEffect, useState } from "react";
import Contex from "store/context";
import ServicesBuBd from "pages/BuBd/api/ServicesBuBd";
import grey_marker from "pages/BuBd/img/grey.png";
import orange_marker from "pages/BuBd/img/orange.png";
import red_marker from "pages/BuBd/img/red.png";
import yellow_marker from "pages/BuBd/img/yellow.png";

//Function filters the data returns array of top 5 by percent_probability
const filterData = (table_data) =>{
    table_data.sort((a, b) => {
      a.percent_probability_BU < b.percent_probability_BU ? 1 : -1
    }
  );
  return table_data.splice(0, 5);
}

//Function dynamically creates icon with color based on the percent
const createIcon = (classes, number) => {
  let color = grey_marker;

  if (parseInt(number) > 75) {
    color = red_marker;
  } else if (parseInt(number) > 50) {
    color = orange_marker;
  } else if (parseInt(number) > 25) {
    color = yellow_marker;
  } else {
    color = grey_marker;
  }

  return (
    <Container className={classes.iconContainer}>
      <Icon className={classes.tableIcon}>
        <img className={classes.markerIcon} src={color} alt="" />
      </Icon>
      <Typography>{number + "%"}</Typography>
    </Container>
  );
};


//Component that the retunrs the table with top 5 bubd
const TableBuBbTop5 = () => {
  const [rows, setBuBdData] = useState([]);
  const classes = useStyles();
  //fucntion to save to global state
  const { globalDispach } = useContext(Contex);
  //array of table columns
  const tableColumns = [
    {
      id: "address",
      numeric: false,
      disablePadding: false,
      label: "Адрес"
    },
    {
      id: "percent_probability",
      numeric: true,
      disablePadding: false,
      label: "Вероятность"
    },
    {
      id: "probability_type",
      numeric: false,
      disablePadding: false,
      label: "Тип вероятности"
    }
  ];

  useEffect(() => {
    ServicesBuBd.getBuBd()
      .then(result => {
        let filtered_data = filterData(result);
        setBuBdData(filtered_data);
      })
      .catch(error => {});
  }, []);

  //function handles the rows of the table
  const BuBdTableRows = (row, print) => {
    return (
      <TableRow
        key={row.fiasGUID}
        hover
        classes={{ hover: classes.rowHover }}
        onClick={event => handleRowClick(event, row)}
        // Set to undefined if the table goes to print, because otherwise it will print in one line
        component={print === "print" ? undefined : Link}
        to="/bubd"
      >
        <TableCell
          component="th"
          scope="row"
          style={{ width: 400 }}
          align="left"
        >
          {row.fiasAddress}
        </TableCell>
        <TableCell style={{ width: 40 }} align="right">
          {createIcon(
            classes,
            row.probability_BU === 1
              ? row.percent_probability_BU
              : row.percent_probability_BD
          )}
        </TableCell>
        <TableCell style={{ width: 40 }} align="right">
          Безучетное потребление
        </TableCell>
      </TableRow>
    );
  };

//function that handles the saving of selected row values
  const handleRowClick = (event, row) => {
    globalDispach({
      isOpenSidebar: true,
      markerValue: row
    });
  };

  return rows.length > 0
    ? [
        <TableTemplate
          key="bubd-table"
          rows={rows}
          columns={tableColumns}
          rowsSettings={BuBdTableRows}
        />
      ]
    : [<InfoWindow label="Нет данных" icon="info" />];
};

const useStyles = makeStyles(theme => ({
  markerIcon: {
    width: 25,
    height: 25
  },
  iconContainer: {
    display: "flex",
    alignItems: "center"
  },
  tableIcon: {
    paddingRight: "56px"
  },
  rowHover: {
    "&:hover": {
      cursor: "pointer"
    },
    textDecoration: "none"
  }
}));

export { TableBuBbTop5 };
