import { Typography, Box, Paper, Grid, styled } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { GaranteedSuppliesCompanies } from "./CompaniesListGS.js";
import { GaranteedSuppliesClusters } from "./ClustersListGS.js";
import Contex from "store/context";
import InfoWindow from "components/InfoWindow.js";
import ServicesGS from "pages/GuaranteedSuppliers/api/ServicesGS";

const StyledPaper = styled(Paper)({
  boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06) !important",
  borderRadius: "4px"
});

const InitialState = () => {
  const classes = useStyles();
  return (
    <Grid key="initial-state-item" item lg={12} md={12} sm={12} xl={12} xs={12}>
      <StyledPaper key="initial-state-paper" elevation={1}>
        <Typography key="initial-state-text" className={classes.cornerTextCard}>
          Статистика гарантирующих поставщиков
        </Typography>
        <InfoWindow
          label="Чтобы посмотреть статистику гарантирующих поставщиков, выберите
        адрес"
          icon="info"
        />
      </StyledPaper>
    </Grid>
  );
};

const ShowDataState = () => {
  const classes = useStyles();
  const [date, setDate] = useState("");
  const { globalState } = useContext(Contex);

  useEffect(() => {
    if (globalState.fiasId !== "") {
      ServicesGS.getFiasClusters(globalState.fiasId)
        .then(result => {
          if (result.length) {
            setDate(result[0].date_time);
          }
        })
        .catch(error => {});
    }
    // setLoading(true);
  }, [globalState.fiasId]);

  return (
    <Grid key="info-section-item" item lg={6} md={6} sm={6} xl={6} xs={12}>
      <div key="info-section-div" style={{ height: "100%" }}>
        <Grid
          key="info-section-container"
          container
          spacing={3}
          justify="flex-start"
          alignContent="center"
          alignItems="center"
          direction="row"
          wrap="wrap"
        >
          <Grid
            key="building-cards-item"
            item
            lg={12}
            md={12}
            sm={12}
            xl={12}
            xs={12}
            >
            <StyledPaper key="building-cards-paper" elevation={1}>
              <BuildingCards />
            </StyledPaper>
          </Grid>
          <Grid
            key="clusters-item"
            item
            lg={12}
            md={12}
            sm={12}
            xl={12}
            xs={12}
            style={{ height: "100%" }}
            >
            <StyledPaper key="clusters-paper" elevation={1}>
              <Box key="clusters-container" className={classes.boxPaddingTabs}>
                <Typography key="clusters-text" className={classes.graphText}>
                  Кластеры
                </Typography>
                <Typography
                  key="clusters-value"
                  className={classes.clusterDate}
                >
                  {date}
                </Typography>
                {/* Table with urid and  */}
                <GaranteedSuppliesClusters />
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );


};

const BuildingCards = () => {
  const [cardsData, setCardsData] = useState([]);
  const { globalState } = useContext(Contex);
  const classes = useStyles();

  const address_name =
    globalState.building_address !== "" ? globalState.building_address : "";

  useEffect(() => {
    if (globalState.fiasId !== "") {

      ServicesGS.getBuildFeatClean(globalState.fiasId)
      .then((result) => {
        if (result.length > 0) {
          setCardsData(result);
        }
      })
      .catch((error) => {});
    }
  }, [globalState.fiasId]);

  return cardsData.length > 0
    ? [
        <>
          <Box key="address-name-container" className={classes.boxPaddingLabel}>
            <Typography
              key="address-name"
              className={classes.balanceGroupLabel}
            >
              {address_name}
            </Typography>
          </Box>
          <Box key="cards-container" className={classes.boxPaddingCards}>
            <Grid
              key="cards-grid"
              container
              spacing={2}
              justify="flex-start"
              alignContent="stretch"
              alignItems="stretch"
              direction="row"
              display="flex"
              >
              {/* Number of floors card */}
              <Grid
                key="floors-count-item"
                item
                lg={4}
                md={4}
                sm={6}
                xl={4}
                xs={12}
                >
                <Box key="floors-count-container" className={classes.boxStyle}>
                  <Typography
                    key="floors-count-text"
                    className={classes.cornerTitle}
                  >
                    Количество этажей
                  </Typography>
                  <Typography
                    key="floors-count-value"
                    className={classes.boxValuesText}
                  >
                    {cardsData[0].floor_num}
                  </Typography>
                </Box>
              </Grid>
              {/* Nuumber of flats card */}
              <Grid
                key="flats-count-item"
                item
                lg={4}
                md={4}
                sm={6}
                xl={4}
                xs={12}
                >
                <Box key="flats-count-container" className={classes.boxStyle}>
                  <Typography
                    key="flats-count-text"
                    className={classes.cornerTitle}
                  >
                    Количество квартир
                  </Typography>
                  <Typography
                    key="flats-count-value"
                    className={classes.boxValuesText}
                  >
                    {cardsData[0].flat_num}
                  </Typography>
                </Box>
              </Grid>
              {/* Number of lifts card */}
              <Grid
                key="lift-count-item"
                item
                lg={4}
                md={4}
                sm={6}
                xl={4}
                xs={12}
                >
                <Box key="lift-count-container" className={classes.boxStyle}>
                  <Typography
                    key="lift-count-text"
                    className={classes.cornerTitle}
                  >
                    Количество лифтов
                  </Typography>
                  <Typography
                    key="lift-count-value"
                    className={classes.boxValuesText}
                  >
                    {cardsData[0].elev_num}
                  </Typography>
                </Box>
              </Grid>
              {/* Construction year card */}
              <Grid
                key="construction-year-item"
                item
                lg={4}
                md={4}
                sm={6}
                xl={4}
                xs={12}
                >
                <Box
                  key="construction-year-container"
                  className={classes.boxStyle}
                >
                  <Typography
                    key="construction-year-text"
                    className={classes.cornerTitle}
                  >
                    Год постройки
                  </Typography>
                  <Typography
                    key="construction-year-value"
                    className={classes.boxValuesText}
                  >
                    {cardsData[0].comm_year}
                  </Typography>
                </Box>
              </Grid>
              {/* Living area card */}
              <Grid
                key="living-area-item"
                item
                lg={4}
                md={4}
                sm={6}
                xl={4}
                xs={12}
                >
                <Box key="living-area-container" className={classes.boxStyle}>
                  <Typography
                    key="living-area-text"
                    className={classes.cornerTitle}
                  >
                    Жилая площадь
                  </Typography>
                  <Typography
                    key="living-area-value"
                    className={classes.boxValuesText}
                  >
                    {cardsData[0].living_area}м2
                  </Typography>
                </Box>
              </Grid>
              {/* Building gas status card */}
              <Grid key="gas-item" item lg={4} md={4} sm={6} xl={4} xs={12}>
                <BuildingHasGas value={cardsData[0].is_gas} />
              </Grid>
            </Grid>
          </Box>
        </>
      ]
    : [
        <>
          <Box key="address-container" className={classes.boxPaddingLabel}>
            <Typography
              key="address-value"
              className={classes.balanceGroupLabel}
            >
              {address_name}
            </Typography>
          </Box>
          <InfoWindow label="Нет данных" icon="info" />
        </>
      ];
};

const BuildingHasGas = props => {
  const classes = useStyles();
  let value = props.value;

  return value === 1
    ? [
        <Box
          key="gas-container"
          className={classes.boxStyleGas}
          style={{ height: "100%" }}
        >
          <Typography key="gas-text" className={classes.cornerTitle}>
            Газифицировано
          </Typography>
        </Box>
      ]
    : [
        <Box
          key="nogas-container"
          className={classes.boxStyleNoGas}
          style={{ height: "100%" }}
        >
          <Typography key="nogas-text" className={classes.cornerTitle}>
            Негазифицировано
          </Typography>
        </Box>
      ];
};

const InfoSectionGS = () => {
  const { globalState } = useContext(Contex);

  return globalState.fiasId !== ""
    ? [<ShowDataState key="show-date-state" />]
    : [<InitialState key="initial-state" />];
};

const useStyles = makeStyles(theme => ({
  boxPaddingLabel: {
    paddingTop: "16px",
    paddingLeft: "16px",
    paddingBottom: "16px"
  },
  boxPaddingCards: {
    paddingLeft: "16px",
    paddingBottom: "16px",
    paddingRight: "16px"
  },
  boxPaddingTabs: {
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  boxStyle: {
    maxWidth: "250px",
    display: "block",
    background: "linear-gradient(127.52deg, #00CAFF 20.68%, #4A9CFF 80.9%);",
    borderRadius: "4px",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
    color: "#FFFFFF"
  },

  boxStyleGas: {
    maxWidth: "250px",
    display: "block",
    background: "linear-gradient(127.52deg, #F19E69 20.68%, #4A9CFF 80.9%)",
    borderRadius: "4px",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
    color: "#FFFFFF"
  },
  boxStyleNoGas: {
    maxWidth: "250px",
    display: "block",
    background: "linear-gradient(127.52deg, #A0A1A2 20.68%, #4A9CFF 80.9%)",
    borderRadius: "4px",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
    color: "#FFFFFF"
  },
  cornerTextCard: {
    position: "relative",
    fontSize: "14px",
    lineHeight: "17px",
    paddingTop: "16px",
    paddingLeft: "16px",
    color: "#252F4A",
    opacity: "0.25"
  },
  cornerTitle: {
    position: "relative",
    fontSize: "14px",
    lineHeight: "17px",
    paddingTop: "9px",
    paddingLeft: "12px",
    color: "#FFFFFF"
  },
  boxValuesText: {
    position: "relative",
    fontSize: "28px",
    lineHeight: "40px",
    fontWeight: "bold",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
    paddingBottom: "10px",
    paddingLeft: "12px",
    color: "#FFFFFF"
  },
  graphText: {
    display: "inline-block",
    fontSize: "12px",
    lineHeight: "15px",
    fontWeight: "bold",
    paddingLeft: "16px",
    paddingTop: "21px"
  },
  clusterDate: {
    display: "inline-block",
    float: "right",
    fontSize: "12px",
    lineHeight: "15px",
    fontWeight: "bold",
    paddingLeft: "16px",
    paddingTop: "21px"
  },
  balanceGroupLabel: {
    fontSize: "14px",
    lineHeight: "17px",
    color: "#252F4A"
  }
}));

export { InfoSectionGS };
