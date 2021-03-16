import {
  TableCell,
  TableRow,
  Box,
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
import grey_marker from "pages/BuBd/img/grey.png";
import orange_marker from "pages/BuBd/img/orange.png";
import red_marker from "pages/BuBd/img/red.png";
import table_data from "data/BU_BD_v3.json";
import yellow_marker from "pages/BuBd/img/yellow.png";

const tableColumns = [
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Адрес"
  },
  {
    id: "percent_probability_BU",
    numeric: true,
    disablePadding: true,
    label: "Вероятность"
  },
  {
    id: "probability_type",
    numeric: false,
    disablePadding: false,
    label: "Тип вероятности"
  },
  {
    id: "report",
    numeric: false,
    disablePadding: false,
    label: "Акт"
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Статус задания"
  }
];

function manageData() {
  let sorted_data = [];
  table_data.sort((a, b) =>
    a.percent_probability_BU < b.percent_probability_BU ? 1 : -1
  );
  return table_data.splice(0, 5);
}

const BuBdTable = () => {
  const [rows, setBuBdData] = useState([]);
  const classes = useStyles();
  const { globalDispach } = useContext(Contex);

  const rowsPerPage = 11;

  useEffect(() => {
    setBuBdData(table_data);
  }, []);

  const defaultProps = {
    bgcolor: "rgba(140, 148, 158, 0.1)",
    style: {
      width: "6.9rem",
      height: "1.5rem",
      color: "rgba(140, 148, 158, 1)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  };

  const tableRowClick = (event, row) => {
    row.tp = "данные подгружаются";
    if (row.type === "BU") {
      row.percent_probability_BU = row.percent_probability;
      row.percent_probability_BD = 0;
    } else {
      row.percent_probability_BD = row.percent_probability;
      row.percent_probability_BU = 0;
    }

    globalDispach({
      isOpenSidebar: true,
      markerValue: row,
    });
  };

  const BuBdTableRows = (row, print) => {
    return (
      <TableRow
        hover
        tabIndex={-1}
        key={row.fias_id}
        classes={{ hover: classes.rowHover }}
        // Set to undefined if the table goes to print, because otherwise it will print in one line
        component={print === "print" ? undefined : Link}
        to="/bubd"
      >
        <TableCell
          component="th"
          scope="row"
          onClick={event => tableRowClick(event, row)}
          padding="default"
          align="left"
        >
          {row.address}
        </TableCell>
        <TableCell align="left" onClick={event => tableRowClick(event, row)}>
          {CreateIcon(classes, row.probability_BU === 1 ? row.percent_probability_BU : row.percent_probability_BD)}
        </TableCell>
        <TableCell align="center" onClick={event => tableRowClick(event, row)}>
          Безучетное потребление
        </TableCell>
        <TableCell align="center">
          <Link underline="always" className={classes.linkStyle}>
            Добавить обратную связь
          </Link>
        </TableCell>
        <TableCell align="center">
          <Box borderRadius={5} {...defaultProps}>
            Новое
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  return rows.length > 0
    ? [
        <TableTemplate
          rows={rows}
          columns={tableColumns}
          rowsSettings={BuBdTableRows}
          rowsPerPage={rowsPerPage}
          orderBy="percent_probability_BU"
          order="desc"
        />
      ]
    : [<InfoWindow label="Нет данных" icon="info" />];
};

const CreateIcon = (classes, number) => {
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
      <Typography>{number.toString() + "%"}</Typography>
    </Container>
  );
};

const BuBdTop5Table = () => {
  const [rows, setBuBdData] = useState([]);
  const classes = useStyles();
  const { globalState, globalDispach } = useContext(Contex);

  let rowsPerPage = 5;

  useEffect(() => {
    setBuBdData(manageData());
  }, []);

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

  const BuBdTableRows = (row, print) => {
    return (
      <TableRow
        key={row.fias_id}
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
          {row.address}
        </TableCell>
        <TableCell style={{ width: 40 }} align="right">
          {CreateIcon(classes, row.probability_BU === 1 ? row.percent_probability_BU : row.percent_probability_BD)}
        </TableCell>
        <TableCell style={{ width: 40 }} align="right">
          Безучетное потребление
        </TableCell>
      </TableRow>
    );
  };

  const handleRowClick = (event, row) => {
    globalDispach({
      isOpenSidebar: true,
      markerValue: row,
    });
  };

  return rows.length > 0
    ? [
        <TableTemplate
          rows={rows}
          columns={tableColumns}
          rowsSettings={BuBdTableRows}
          rowsPerPage={5}
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
  linkStyle: {
    color: "#4A9CFF",
    whiteSpace: "nowrap"
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

export { BuBdTop5Table, BuBdTable };
