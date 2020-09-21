import { makeStyles } from "@material-ui/core/styles";
import React, { useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";

import {
  GetIsCleanByBalanceIndex,
  GetKgisIdByBranchId,
} from "../scripts/kgisid_mapping.js";
import Contex from "../store/context";
import table_down from "../data/table_down.json";

function createData(
  balanceGroup,
  imbalancePercent,
  imbalanceKwh,
  technicalPercent,
  technicalKwt,
  notTechnicalPecent,
  notTechnicalKwt
) {
  return {
    balanceGroup,
    imbalancePercent,
    imbalanceKwh,
    technicalPercent,
    technicalKwt,
    notTechnicalPecent,
    notTechnicalKwt,
  };
}

const createRows = () => {
  var rows = [];
  table_down.map((item) => {
    if (item.date_month === "сентябрь") {
      rows.push(
        createData(
          item.balance_id,
          item.imbalance_percent,
          item.imbalance_kwh,
          item.technical_losses_percent,
          item.technical_losses_kwh,
          item.non_technical_losses_percent,
          item.non_technical_losses_kwh
        )
      );
    }
    return item;
  });
  return rows;
};

const rows = createRows();

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
  {
    id: "balanceGroup",
    numeric: true,
    disablePadding: true,
    label: "Балансовая группа",
  },
  {
    id: "imbalancePercent",
    numeric: true,
    disablePadding: false,
    label: "Небалансы (%)",
  },
  {
    id: "imbalanceKwh",
    numeric: true,
    disablePadding: false,
    label: "Небалансы (кВтч)",
  },
  // {
  //   id: "technicalPercent",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Технические (%)",
  // },
  // {
  //   id: "technicalKwt",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Технические (кВт)",
  // },
  // {
  //   id: "notTechnicalPecent",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Нетехнические потери (%)",
  // },
  // {
  //   id: "notTechnicalKwt",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Нетехнические потери (кВт)",
  // },
];

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    // numSelected,
    // rowCount,
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
    padding: "0 15px",
    height: "95%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {},
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
  tableBalance: {
    height: "100%",
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("balanceGroup");
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { globalDispach } = useContext(Contex);

  const handleRequestSort = (event, property) => {
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

  const handleRowClick = (event, balance_index) => {
    /*Search for the ConsumerBuilding which belongs to selected balance group, in order to get is_clean and branch_id*/
    var building_obj = GetIsCleanByBalanceIndex(balance_index);

    globalDispach({
      type: "FILTERCOMPONENT",
      kgis_id:
        typeof building_obj !== "undefined"
          ? GetKgisIdByBranchId(building_obj.branch_id)
          : "",
      isPhantomic: false,
      balance_index: balance_index,
      isClean:
        typeof building_obj !== "undefined" ? building_obj.is_clean : false,
      objSelected: true,
      building_address: "",
      obj_from: "table_click",
      isInPSK: false,
    });
  };

  return (
    <div className={classes.root}>
      <TableContainer id="balance-table" className={classes.tableBalance}>
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
                    key={row.balanceGroup}
                    onClick={(event) => handleRowClick(event, row.balanceGroup)}
                    // selected ={true}
                  >
                    <TableCell component="th" scope="row" padding="none">
                      Балансовая группа №{row.balanceGroup}
                    </TableCell>
                    <TableCell align="right">{row.imbalancePercent}</TableCell>
                    <TableCell align="right">{row.imbalanceKwh}</TableCell>
                    {/* <TableCell align="right">{row.technicalPercent}</TableCell> */}
                    {/* <TableCell align="right">{row.technicalKwt}</TableCell> */}
                    {/* <TableCell align="right">
                      {row.notTechnicalPecent}
                    </TableCell> */}
                    {/* <TableCell align="right">{row.notTechnicalKwt}</TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage={"Строк на странице"}
      />
    </div>
  );
}
