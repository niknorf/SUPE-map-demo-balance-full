import {
  Table,
  TableBody,
  TableCell,
  // Link,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Box,
  Typography,
  Container,
  Icon,
} from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { ruRU } from "@material-ui/core/locale";
import React, { useState, useContext } from "react";
import Contex from "../store/context";
import PropTypes from "prop-types";
import grey_marker from "../img/grey.png";
import orange_marker from "../img/orange.png";
import red_marker from "../img/red.png";
import table_data from "../data/bu_bd.json";
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
percent_transmission_PU
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
    percent_transmission_PU
    };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "address", numeric: false, disablePadding: true, label: "Адрес" },
  {
    id: "percent_probability",
    numeric: true,
    disablePadding: false,
    label: "Вероятность",
  },
  {
    id: "probability_type",
    numeric: false,
    disablePadding: false,
    label: "Тип вероятности",
  },
  { id: "report", numeric: false, disablePadding: false, label: "Акт" },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Статус задания",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.headCellStyle}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "0 12px 0 16px",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  headCellStyle: {
    fontWeight: "bold",
  },
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

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("percent_probability");
  const [selected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const { globalDispach } = useContext(Contex);

  const handleRequestSort = (event, property) => {
    console.log(property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var rows = [];

  table_data.map((item) => {
    let percent_probability;
    let percent_type;

    if (item.percent_probability_BD === 0) {
      percent_probability = item.percent_probability_BU;
      percent_type = 'BU'
    } else {
      percent_probability = item.percent_probability_BD;
      percent_type = 'BD'
    }
    rows.push(
      createData(
        item.address,
        percent_probability,
        percent_type,
        "Безучетное потребление",
        "Добавить акт",
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
        item.percent_transmission_PU
      )
    );
    return rows;
  });

  const defaultProps = {
    bgcolor: "rgba(140, 148, 158, 0.1)",
    // borderColor: 'text.primary',
    // m: 1,
    // border: 0,
    style: {
      width: "6.9rem",
      height: "1.5rem",
      color: "rgba(140, 148, 158, 1)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const theme = createMuiTheme({}, ruRU);

  const tableRowClick = (event, row) => {

    row.tp = "данные подгружаются";
    if(row.type === "BU"){
      row.percent_probability_BU = row.percent_probability;
      row.percent_probability_BD = 0;
    }else{
      row.percent_probability_BD = row.percent_probability;
      row.percent_probability_BU = 0;
    }

    globalDispach({
      type: "BUBD",
      isOpenSidebar: true,
      markerValue: row,
    });
  };

  return (
    <div className={classes.root}>
      <TableContainer id="balance-table">
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
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
                      padding="none"
                      align="left"
                    >
                      {row.address}
                    </TableCell>
                    <TableCell align="center" onClick={(event) => tableRowClick(event, row)}>
                      {CreateIcon(classes, row.percent_probability)}
                    </TableCell>
                    <TableCell align="center" onClick={(event) => tableRowClick(event, row)}>{row.probability_type}</TableCell>
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
                    {/* <TableCell align="center">{row.notTechnicalKwt}</TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <ThemeProvider theme={theme}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ThemeProvider>
    </div>
  );
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
