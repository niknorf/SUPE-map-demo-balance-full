import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  List,
} from "@material-ui/core";

const useStyles = makeStyles({
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
    width: 1,
  },
  headCellStyle: {
    fontWeight: "bold",
    lineHeight: '15px',
    color: "#252F4A",
    fontFamily: 'PF Din Text Cond Pro'
  },
});


export default function ListTemplate(props) {
  // const [page, setPage] = useState(0);
  // const [order, setOrder] = useState("asc");
  // const [orderBy, setOrderBy] = useState("balanceGroup");
  const classes = useStyles();

  const rows = props.rows;
  // const headCells = props.columns;
  // const rowsPerPage = typeof props.rowsPerPage !== 'undefined' ? props.rowsPerPage : 5;
  //
  // console.log(rowsPerPage);
  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  //
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  //
  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  return (
    <List dense={true}>
      {rows.map((row) => (
        props.rowsSettings(row)
      ))}
    </List>
  );
}
