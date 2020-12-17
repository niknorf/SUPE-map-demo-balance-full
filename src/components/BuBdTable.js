import {
  TableCell,
  TableRow,
  Box,
  Typography,
  Container,
  Icon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import TableTemplate from "./TableTemplate";
import InfoWindow from "./InfoWindow.js";
import React, { useState, useContext } from "react";
import Contex from "../store/context";
import grey_marker from "../img/grey.png";
import orange_marker from "../img/orange.png";
import red_marker from "../img/red.png";
import table_data from "../data/BU_BD_v3.json";
import yellow_marker from "../img/yellow.png";

function createData(
  address,
  percent_probability,
  type,
  probability_type,
  report,
  status,
  SPARK,
  TP,
  data_PSK,
  date_month,
  date_year,
  holidays,
  imbalance,
  importance_PSK_ODN,
  importance_PSK_fiz_face,
  importance_PSK_ur_face,
  percent_transmission_PU,
  lat,
  lon,
  kgis_id,
  information,
  floors,
  comments
) {
  return {
    address,
    percent_probability,
    type,
    probability_type,
    report,
    status,
    SPARK,
    TP,
    data_PSK,
    date_month,
    date_year,
    holidays,
    imbalance,
    importance_PSK_ODN,
    importance_PSK_fiz_face,
    importance_PSK_ur_face,
    percent_transmission_PU,
    lat,
    lon,
    kgis_id,
    information,
    floors,
    comments
  };
}

const tableColumnsShort = [
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Адрес",
  },
  {
    id: "percent_probability",
    numeric: true,
    disablePadding: true,
    label: "Вероятность",
  },
  {
    id: "probability_type",
    numeric: false,
    disablePadding: false,
    label: "Тип вероятности",
  }
];

const tableColumns = [
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Адрес",
  },
  {
    id: "percent_probability",
    numeric: true,
    disablePadding: true,
    label: "Вероятность",
  },
  {
    id: "probability_type",
    numeric: false,
    disablePadding: false,
    label: "Тип вероятности",
  },
  {
    id: "report",
    numeric: false,
    disablePadding: false,
    label: "Акт",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Статус задания",
  },
];

const useStyles = makeStyles((theme) => ({
  markerIcon: {
    width: 25,
    height: 25,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
  linkStyle: {
    color: "#4A9CFF",
    whiteSpace: "nowrap",
  },
  tableIcon: {
    paddingRight: "56px",
  },
  rowHover: {
    "&:hover": {
      cursor: "pointer",
    },
    textDecoration: "none",
  },
}));

export default function BuBdTable(props) {
  const classes = useStyles();
  const { globalDispach } = useContext(Contex);
  var rows = [];

  table_data.map((item) => {
    let percent_probability;
    let percent_type;

    if (item.percent_probability_BD === 0) {
      percent_probability = item.percent_probability_BU;
      percent_type = "BU";
    } else {
      percent_probability = item.percent_probability_BD;
      percent_type = "BD";
    }
    rows.push(
      createData(
        item.address,
        percent_probability,
        percent_type,
        "Безучетное потребление",
        "Добавить обратную связь",
        "Новое",
        item.SPARK,
        item.TP,
        item.data_PSK,
        item.date_month,
        item.date_year,
        item.holidays,
        item.imbalance,
        item.importance_PSK_ODN,
        item.importance_PSK_fiz_face,
        item.importance_PSK_ur_face,
        item.percent_transmission_PU,
        item.lat,
        item.lon,
        item.kgis_id,
        item.information,
        item.floors,
        item.comments
      )
    );
    return rows;
  });

  const defaultProps = {
    bgcolor: "rgba(140, 148, 158, 0.1)",
    style: {
      width: "6.9rem",
      height: "1.5rem",
      color: "rgba(140, 148, 158, 1)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
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
      type: "BUBD",
      isOpenSidebar: true,
      markerValue: row,
      isLoggedIn: true, //TODO check the token
    });
  };

  const BuBdTableRows = (row) => {
    return props.rowsPerPage === 5
      ? [
          <TableRow
            hover
            tabIndex={-1}
            key={row.address}
            classes={{ hover: classes.rowHover }}
            component={Link}
            to="/bubd"
          >
            <TableCell
              component="th"
              scope="row"
              onClick={(event) => tableRowClick(event, row)}
              padding="default"
              align="left"
            >
              {row.address}
            </TableCell>
            <TableCell
              align="left"
              onClick={(event) => tableRowClick(event, row)}
            >
              {CreateIcon(classes, row.percent_probability)}
            </TableCell>
            <TableCell
              align="center"
              onClick={(event) => tableRowClick(event, row)}
            >
              {row.probability_type}
            </TableCell>
          </TableRow>,
        ]
      : [
          <TableRow
            hover
            tabIndex={-1}
            key={row.address}
            classes={{ hover: classes.rowHover }}
            component={Link}
            to="/bubd"
          >
            <TableCell
              component="th"
              scope="row"
              onClick={(event) => tableRowClick(event, row)}
              padding="default"
              align="left"
            >
              {row.address}
            </TableCell>
            <TableCell
              align="left"
              onClick={(event) => tableRowClick(event, row)}
            >
              {CreateIcon(classes, row.percent_probability)}
            </TableCell>
            <TableCell
              align="center"
              onClick={(event) => tableRowClick(event, row)}
            >
              {row.probability_type}
            </TableCell>
            <TableCell align="center">
              {" "}
              <Link underline="always" className={classes.linkStyle}>
                {row.report}
              </Link>
            </TableCell>
            <TableCell align="center">
              <Box borderRadius={5} {...defaultProps}>
                {row.status}
              </Box>
            </TableCell>
          </TableRow>,
        ];
  };

  return rows.length > 0
    ? [
        <TableTemplate
          rows={rows}
          columns={props.rowsPerPage === 5 ? tableColumnsShort: tableColumns}
          rowsSettings={BuBdTableRows}
          rowsPerPage={props.rowsPerPage}
          orderBy="percent_probability"
          order="desc"
          topFive={props.topFive}
        />,
      ]
    : [<InfoWindow label="Нет данных" icon="info" />];
}

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
