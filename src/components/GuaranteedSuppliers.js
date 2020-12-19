import {
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  Typography,
  Box,
  styled
} from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SearchComponent } from "./FilterComponent";
import { InfoSectionGS } from "./InfoSectionGS";
import { BottomSectionGS } from "./BottomSectionGS";
import { HouseStatisticsChart } from "./ChartGS";
import Contex from "../store/context";
import clsx from "clsx";

import PFDinRegularWoff from "../fonts/PFDinTextCondPro-Regular.woff";

const pfdinRegular = {
  fontFamily: "PFDinTextCondPro-Regular",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: "400",
  color: "#252F4A",
  src: `
    local('PFDinTextCondPro-Regular'),
    url(${PFDinRegularWoff}) format('woff')
    `,
};

const StyledPaper = styled(Paper)({
  boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06) !important",
  borderRadius: "4px"
});

const theme = createMuiTheme({
  typography: {
    fontFamily: "PFDinTextCondPro-Regular !important",
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
  balanceText: {
    fontSize: "32px",
    lineHeight: "38px",
  },
  balanceTextContainer: {
    paddingTop: "40px",
  },
}));

const GuaranteedSuppliers = (props) => {
  const classes = useStyles();
  const { globalDispach } = useContext(Contex);
  const { fias, name} =
    (props.location && props.location.row) || {};

  // useEffect(() => {
  //   globalDispach({
  //     type: "FILTERCOMPONENT",
  //     fiasId: 'fdb3ba07-4915-420c-a9aa-f5e909d3fe16',
  //     isLoggedIn: true,
  //   });
  // }, []);

  // useEffect(() => {
  //   globalDispach({
  //     type: "FILTERCOMPONENT",
  //     fiasId: '5d3752f0-6899-4ad5-817f-3f32dbad8930',
  //   });
  // }, []);
  useEffect(() => {
    globalDispach({
      type: "FILTERCOMPONENT",
      isLoggedIn: true, //TODO check the token
      fiasId: typeof fias !== 'undefined' ? fias : '',
      building_address: typeof name !== 'undefined' ? name : ''
    });
  }, []);

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
            >
            <Box className={classes.balanceTextContainer}>
              <Typography
                className={classes.balanceText}
                variant="h2"
                gutterBottom
                >
                Статистика гарантирующих поставщиков
              </Typography>
            </Box>
          </Grid>
          {/* Filter */}
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <StyledPaper elevation={1}>
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
                  <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
                    <SearchComponent />
                  </Grid>
                </Grid>
              </Container>
            </StyledPaper>
          </Grid>
          {/* Info section */}
          <InfoSectionGS/>
          {/* 2 charts */}
          <Grid item lg={6} md={6} sm={6} xl={6} xs={12}>
            <StyledPaper elevation={1} style={{ height: "100%" }}>
              <HouseStatisticsChart />
            </StyledPaper>
          </Grid>

          {/* Bottom section */}
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <StyledPaper elevation={1}>
              <BottomSectionGS/>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

GuaranteedSuppliers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(GuaranteedSuppliers);
