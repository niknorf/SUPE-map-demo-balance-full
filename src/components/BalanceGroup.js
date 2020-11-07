import {
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
  Box,
} from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { GraphicGroup, OutInputMonthGraphic } from "./Graphic";
import { JustificationCards } from "./JustificationCards";
import { ImbalancePskPu } from "./charts/ImbalancePskPu";
import { InfoSection } from "./InfoSectionBG";
import { SearchComponent, TsSearchComponent } from "./FilterComponent";
import BalanceTable from "./BalanceTable";
import GeneralMap from "./MapBG";
import PFDinRegularWoff from "../fonts/PFDinTextCondPro-Regular.woff";

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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
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
          <Grid
            item
            lg={8}
            md={7}
            sm={12}
            xl={9}
            xs={12}
          >
            <GeneralMap />
          </Grid>
          {/* Table */}
          <Grid item lg={4} md={5} sm={6} xl={3} xs={12}>
            <Paper elevation={1} style={{ height: "100%" }}>
              <BalanceTable />
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
            <Paper elevation={1}>
              <OutInputMonthGraphic/>
            </Paper>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Paper elevation={1}>
              <GraphicGroup />
            </Paper>
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
