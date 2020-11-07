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
import React, { useContext, useEffect, useState } from "react";
import full_res from "../data/graphic/res_imbalance_front.json";
import { makeStyles, useTheme } from "@material-ui/styles";
import PropTypes from "prop-types";

import Contex from "../store/context";
import balance_group_items from "../data/balance_result_simple.json";

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
  tableBalance: {
    height: "60vh",
    padding: "0 15px",
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

const BalanceGroupContent = () => {
  const classes = useStyles();
  const [rows, setBgContent] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { globalState } = useContext(Contex);

  useEffect(() => {
    if (globalState.balance_index !== "") {
      fetch("/api/Results/GetBalanceResultFull/" + globalState.balance_index)
        .then((res) => res.json())
        .then(
          (result) => {
            translateText(result);
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

  const translateText = (original) => {
    let translation = [
      { original: "PowerTransformer", rus_translate: "Силовой трансформатор" },
      { original: "ConsumerBuilding", rus_translate: "Здание" },
      { original: "ACLineSegment", rus_translate: "Кабельная линия" },
      {
        original: "LVSwitchGear",
        rus_translate: "Кабельный киоск/разъединитель",
      },
      { original: "LVCabinet", rus_translate: "ГРЩ" },
      { original: "LoadBreakSwitch", rus_translate: "Переключатель нагрузки" },
    ];
    let temp = [];
    for (let i = 0; i < original.length; i++) {
      if (original[i].type !== "Link") {
        for (let j = 0; j < translation.length; j++) {
          if (original[i].type === translation[j].original) {
            original[i].type = translation[j].rus_translate;
          }
        }
        temp.push(createData(original[i].name, original[i].type));
      }
    }

    setBgContent(temp);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const balance_id = globalState.balance_index;

  // var rows = [];
  //
  // balanceGroupContent.map((item) => {
  //   // if (item.balance_index.toString() === balance_id.toString()) {
  //     rows.push(createData(item.name, item.type));
  //   // }
  //   // return item;
  // });

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer className={classes.tableBalance}>
      <Table
        // className={classes.table}
        // aria-labelledby="tableTitle"
        aria-label="enhanced table"
      >
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

export { BalanceGroupContent };
