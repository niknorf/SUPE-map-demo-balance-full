import {
  Typography,
  Container,
  Box,
  Paper,
  TablePagination,
  TableFooter,
  Icon,
  TableRow,
  TableHead,
  IconButton,
  TableContainer,
  TableCell,
  Table,
  TableBody,
  Grid,
} from "@material-ui/core";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import React, { useContext } from "react";
import full_res from "../data/graphic/res_imbalance_front.json";
import { makeStyles, useTheme } from "@material-ui/styles";
import PropTypes from "prop-types";

import Contex from "../store/context";
import balance_group_items from "../data/balance_result_simple.json";
import info_icon from "../img/info_icon.svg";
import triangle_icon from "../img/triangle_icon.svg";

const useStyles = makeStyles((theme) => ({
  imageIcon: {
    width: 40,
    height: 40,
  },
  iconRoot: {
    textAlign: "center",
  },
  table: {
    minWidth: 150,
    borderBottom: "none",
  },
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  boxStyle: {
    background: "linear-gradient(127.52deg, #00CAFF 20.68%, #4A9CFF 80.9%);",
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    height: 80,
    borderRadius: "4px",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
    color: "#FFFFFF",
  },
  boxTopText: {
    position: "absolute",
    height: "17px",
    fontFamily: "PF Din Text Cond Pro",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "17px",
    marginTop: "9px",
    marginLeft: "12px",
  },
  boxMiddleText: {
    position: "absolute",
    height: "40px",
    marginTop: "30px",
    marginLeft: "12px",
    marginRight: "33px",
    fontFamily: "PF Din Text Cond Pro",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "32px",
    lineHeight: "40px",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
  },
}));

function createData(name, type) {
  return { name, type };
}

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
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

const MeteringDevices = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { globalState } = useContext(Contex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const balance_id = globalState.balance_index;

  const address_name =
    globalState.building_address !== ""
      ? "(" + globalState.building_address + ")"
      : "";

    // let value  = full_res.map(function(item) {
    //   if(item.balance_id.toString() === balance_id.toString() && item.year === 2020){
    //     return item;
    //   }
    // });

    let input_month = 0;
    let imbalance_kwh = 0;

    let temp_array = [];

    /*TODO SEARCHED BASED ON LATERS MONTH AND YEAR*/
    for(var i=0; i < full_res.length; i++){
      if(full_res[i].balance_id.toString() === balance_id.toString() && full_res[i].year === 2020 && full_res[i].month === "Июл"){
      // temp_array.push(full_res[i])
      /*Temp solution waiting fro month_number inside res_imbalance_front*/
      input_month = full_res[i].input_month;
      imbalance_kwh = full_res[i].imbalance_kwh;

      }
    }
    /*DO NOT REMOVE*/
    // const max = temp_array.reduce(function(prev, current) {
    // return (prev.month > current.month) ? prev : current
    // });
    //
    // for(var i=0; i < temp_array.length; i++){
    //   if(full_res[i].month === max.month){
    //     console.log(full_res[i]);
    //     input_month = full_res[i].input_month;
    //     imbalance_kwh = full_res[i].imbalance_kwh;
    //   }
    // }
  var rows = [];

  balance_group_items.map((item) => {
    if (item.balance_index.toString() === balance_id.toString()) {
      rows.push(createData(item.name, item.type));
    }
    return item;
  });

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Название</TableCell>
              <TableCell align="right">Тип</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                labelRowsPerPage={"Строк на странице"}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


export { MeteringDevices };
