import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  TableHead,
  IconButton,
  TableSortLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Button
} from "@material-ui/core";
import ReactToPrint from "react-to-print";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import icon_print from "assets/img/printer.svg";
import "assets/css/print.css";

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

const useStyles2 = makeStyles({
  table: {
    // minHeight: 500,
  },
  tableContainer: {
    // height: "100vh",
    // padding: "0 15px",
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
    width: 1
  },
  headCellStyle: {
    fontWeight: "bold",
    lineHeight: "15px",
    color: "#252F4A",
    fontFamily: "PF Din Text Cond Pro"
  },
  link: {
    display: "flex",
    color: "#252F4A",
    textDecoration: "underline",
    paddingLeft: "17px",
    paddingBottom: "17px",
    paddingTop: "10px",
    textTransform: "none"
  },

  linkBox: {},
  imageIcon: {
    width: 16,
    height: 16
  }
});

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
  return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.headCellStyle}
          >
            {typeof order !== "undefined" && typeof orderBy !== "undefined"
              ? [
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                ]
              : headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TableTemplate(props) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState(props.order);
  const [orderBy, setOrderBy] = useState(props.orderBy);
  const componentRef = useRef();
  const classes = useStyles2();

  let rows = props.rows;
  const headCells = props.columns;

  const rowsPerPage =
    typeof props.rowsPerPage !== "undefined" ? props.rowsPerPage : 5;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const displayNone = {
    display: "none"
  };

  function TableToPrint() {
    let rowsPerPagePrint = 50;

    return (
      <div style={{ display: "none" }}>
        <TableContainer className={classes.tableContainer} ref={componentRef}>
          <Table className={classes.table} aria-label="custom pagination table">
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>{rows.map(row => props.rowsSettings(row, 'print'))}</TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  return (
    <>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="custom pagination table">
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={headCells}
          />
          <TableBody>
            {(rowsPerPage > 0
              ? stableSort(rows, getComparator(order, orderBy)).slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : rows
            ).map(row => props.rowsSettings(row))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 54 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          {rowsPerPage !== 5
            ? [
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPage={rowsPerPage}
                      count={rows.length}
                      page={page}
                      rowsPerPageOptions={[]}
                      onChangePage={handleChangePage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              ]
            : null}
        </Table>
      </TableContainer>
      <TableToPrint />
      <ReactToPrint
        trigger={() => (
          <Button
            className={classes.link}
            startIcon={
              <img className={classes.imageIcon} src={icon_print} alt="" />
            }
          >
            Распечатать
          </Button>
        )}
        content={() => componentRef.current}
      />
    </>
  );
}
