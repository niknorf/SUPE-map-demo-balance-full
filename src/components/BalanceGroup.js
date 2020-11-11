import {
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
  Box,
  TableCell,
  TableRow,
  useMediaQuery,
} from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  withStyles,
  useTheme,
} from "@material-ui/core/styles";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { GraphicGroup, OutInputMonthGraphic } from "./Graphic";
import { JustificationCards } from "./JustificationCards";
import { ImbalancePskPu } from "./ImbalancePskPu";
import { InfoSection } from "./InfoSectionBG";
import { SearchComponent, TsSearchComponent } from "./FilterComponent";
import TableTemplate from "./TableTemplate";
import GeneralMap from "./MapBG";
import Contex from "../store/context";
import PFDinRegularWoff from "../fonts/PFDinTextCondPro-Regular.woff";
import balance_table from "../data/balance_groups_table.json";

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}
function createData(balanceGroup, imbalancePercent, imbalanceKwh, isClean) {
  return {
    balanceGroup,
    imbalancePercent,
    imbalanceKwh,
    isClean,
  };
}

const pfdinRegular = {
  fontFamily: "PFDinTextCondPro-Regular",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: "400",
  src: `
    local('PFDinTextCondPro-Regular'),
    url(${PFDinRegularWoff}) format('woff')
    `,
};

const theme = createMuiTheme({
  typography: {
    fontFamily: "PFDinTextCondPro-Regular !important",
  },
  typographyStyle: {
    color: "red",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [pfdinRegular],
      },
    },
  },
  palette: {
    primary: {
      main: "#4A9CFF",
      contrastText: "#fff",
    },
    // secondary: {
    //     light: '#55dab3',
    //     main: '#00a883',
    //     dark: '#007856',
    //     contrastText: '#000',
    // }
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)",
  },
  fixedHeight: {
    height: 500,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: "#F5F6F8",
    paddingLeft: 40,
    paddingRight: 40,
    maxWidth: "1292px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    paddingTop: 30,
  },
  balanceText: {
    fontSize: "32px",
    lineHeight: "38px",
  },
  balanceTextContainer: {
    paddingTop: "40px",
  },
  balanceGroupSelectors: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: "24px",
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)",
    marginBottom: "24px",
  },
  balaceGroupType: {
    marginLeft: "40px",
  },
  infoSectionStyles: {
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06)",
    height: "100%", //half of the map height
  },
  tableContainer: {
    paddingTop: "24px",
  },
  tableSortButton: {
    display: "flex",
    flexDirection: "row",
  },
  formControl: {
    width: "100%",
  },
  buttonFilter: {
    backgroundColor: "#4A9CFF",
    boxShadow: "0px 4px 10px rgba(16, 156, 241, 0.24);",
    borderRadius: "4px",
    marginLeft: "24px",
    letterSpacing: "0.01em;",
    fontWeight: "bold",
    textTransform: "none",
    padding: "0 28px",
  },
  adressInputTable: {
    display: "flex",
  },
  filterIcon: {
    width: "20px",
    height: "20px",
  },
  content: {
    width: "100%",
    background: "#F5F6F8",
  },
  balancePaper: {
    height: "100%",
  },
}));

const BalanceGroup = () => {
  const classes = useStyles();
  const { globalDispach } = useContext(Contex);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const tableColumns = [
    {
      id: "balanceGroup",
      numeric: true,
      disablePadding: false,
      label: "Балансовая группа",
    },
    {
      id: "imbalancePercent",
      numeric: true,
      disablePadding: true,
      label: "Небалансы (%)",
    },
    {
      id: "imbalanceKwh",
      numeric: true,
      disablePadding: false,
      label: "Небалансы (кВтч)",
    },
  ];
  const BalanceTableRows = (row) => {
    return (
      <TableRow
        key={row.balanceGroup}
        hover
        onClick={(event) =>
          handleRowClick(event, row.balanceGroup, row.isClean)
        }
      >
        <TableCell component="th" scope="row" style={{ width: 400 }}>
          Балансовая группа №{row.balanceGroup}
        </TableCell>
        <TableCell style={{ width: 40 }} align="right">
          {(Math.round(row.imbalancePercent * 100) / 100).toFixed(2)}
        </TableCell>
        <TableCell style={{ width: 40 }} align="right">
          {(Math.round(row.imbalanceKwh * 100) / 100).toFixed(2)}
        </TableCell>
      </TableRow>
    );
  };
  const BalanceTableData = () => {
    let tableRows = [];
    /*TODO change to data from api call*/
    for (let i = 0; i < balance_table.length; i++) {
      if (balance_table[i].month === 8 && balance_table[i].year === 2020) {
        tableRows.push(
          createData(
            balance_table[i].balance_id,
            balance_table[i].imbalance_percent,
            balance_table[i].imbalance_kwh,
            true
          )
        );
      }
    }
    return tableRows;
  };
  let rowsPerPage = 12;
  let width = useWidth();

  width === "md" ? (rowsPerPage = 12) : (rowsPerPage = 13);

  const handleRowClick = (event, balance_index, isClean) => {
    /*Search for the ConsumerBuilding which belongs to selected balance group, in order to get is_clean and branch_id*/
    // var building_obj = GetIsCleanByBalanceIndex(balance_index);

    globalDispach({
      type: "FILTERCOMPONENT",
      isPhantomic: false,
      balance_index: balance_index,
      isClean: isClean,
      objSelected: true,
      building_address: "",
      obj_from: "table_click",
      isInPSK: false,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          alignContent="stretch"
          alignItems="stretch"
          direction="row"
          display="flex"
        >
          {/* Title */}
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xl={12}
            xs={12}
            style={{ height: "100%" }}
          >
            <Box className={classes.balanceTextContainer}>
              <Typography
                className={classes.balanceText}
                variant="h2"
                gutterBottom
              >
                Балансовые группы
              </Typography>
            </Box>
          </Grid>
          {/* Filter */}
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Paper elevation={1}>
              <Container maxWidth="xl">
                <Grid
                  container
                  spacing={2}
                  justify="flex-start"
                  alignContent="center"
                  alignItems="center"
                  direction="row"
                  wrap="wrap"
                >
                  <Grid item lg={5} md={6} sm={12} xl={5} xs={12}>
                    <SearchComponent />
                  </Grid>
                  <Grid item lg={5} md={6} sm={12} xl={5} xs={12}>
                    <TsSearchComponent />
                  </Grid>
                </Grid>
              </Container>
            </Paper>
          </Grid>
          {/* Map */}
          <Grid item lg={8} md={7} sm={12} xl={8} xs={12}>
            <GeneralMap />
          </Grid>
          {/* Table */}
          {/* style={{ height: "100%" }} */}
          <Grid item lg={4} md={5} sm={6} xl={4} xs={12}>
            <Paper elevation={1} style={{ height: "100%" }}>
              <TableTemplate
                rows={BalanceTableData()}
                columns={tableColumns}
                rowsSettings={BalanceTableRows}
                rowsPerPage={rowsPerPage}
              />
            </Paper>
          </Grid>
          {/* Infor section */}
          <InfoSection />
          {/* Imbalance graphic */}
          <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
            <Paper elevation={1} style={{ height: "100%" }}>
              <ImbalancePskPu />
            </Paper>
          </Grid>
          {/* 5 values */}
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Paper elevation={1}>
              <JustificationCards />
            </Paper>
          </Grid>
          {/* 4 graphics */}
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <OutInputMonthGraphic />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <GraphicGroup />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

BalanceGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(BalanceGroup);
