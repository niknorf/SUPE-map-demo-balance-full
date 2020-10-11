import {
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
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
import { GraphicGroup } from "./Graphic";
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
  BalanceTableStyles: {
    height: "80vh",
  },
}));

const BalanceGroup = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <div className={classes.header}>
              <Typography
                className={classes.balanceText}
                variant="h2"
                gutterBottom
              >
                Балансовые группы
                </Typography>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.balanceGroupSelectors}>
                  {/* SEARCH STREET COMPONENT */}
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <SearchComponent />
                  </Grid>
                  {/* SELECT COMPONENT */}
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <TsSearchComponent />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              {/* MAP SECTION */}
              <Grid item xs={12} sm={12} md={12} lg={8}>
                <GeneralMap />
              </Grid>
              {/* INFO SECTION */}
              <Grid className={classes.tableContainer} item xs={4}>
                <Paper className={clsx(classes.paper, classes.balancePaper)}>
                  <BalanceTable className={classes.BalanceTableStyles} />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Paper
                  className={clsx(fixedHeightPaper, classes.infoSectionStyles)}
                >
                  <InfoSection />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                {/* IMBALACE GRAPHIC */}
                <ImbalancePskPu />
              </Grid>
            </Grid>

            {/* GRAPHIC SECTION */}
            <GraphicGroup />
          </Container>
        </main>
      </ThemeProvider>
    </div>
  );
};

BalanceGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(BalanceGroup);
