import { Typography, Box, Paper, Grid, styled } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { GaranteedSuppliesCompanies } from "./CompaniesListGS.js";
import { GaranteedSuppliesClusters } from "./ClustersListGS.js";
import Contex from "store/context";
import InfoWindow from "components/InfoWindow.js";

const StyledPaper = styled(Paper)({
  boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.06) !important",
  borderRadius: "4px",
});

const InitialState = () => {
  const classes = useStyles();
  return (
    <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
      <StyledPaper elevation={1}>
        <Typography className={classes.cornerTextCard}>
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
  const { globalState } = useContext(Contex);

  return (
    <Grid item lg={6} md={6} sm={6} xl={6} xs={12}>
      <div style={{ height: "100%" }}>
        <Grid
          container
          spacing={3}
          justify="flex-start"
          alignContent="center"
          alignItems="center"
          direction="row"
          wrap="wrap"
        >
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <StyledPaper elevation={1}>
              <BuildingCards />
            </StyledPaper>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xl={12}
            xs={12}
            // style={{ height: "100%" }}
          >
            <StyledPaper elevation={1}>
              <Box className={classes.boxPaddingTabs}>
                <Typography className={classes.graphText}>
                  Юридические лица и общедомовые нужды
                </Typography>
                {/* Table with urid and  */}
                <GaranteedSuppliesCompanies />
              </Box>
            </StyledPaper>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            xl={12}
            xs={12}
            style={{ height: "100%" }}
          >
            <StyledPaper elevation={1}>
              <Box className={classes.boxPaddingTabs}>
                <Typography className={classes.graphText}>Кластеры</Typography>
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
      fetch("/api/Results/GetBuildFeatClean/" + globalState.fiasId)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.length > 0) {
              setCardsData(result);
            }
          },
          (error) => {
            // setLoading(true);
            // setError(error);
          }
        );
    }
  }, [globalState.fiasId]);

  return cardsData.length > 0
    ? [
        <>
          <Box className={classes.boxPaddingLabel}>
            <Typography className={classes.balanceGroupLabel}>
              {address_name}
            </Typography>
          </Box>
          <Box className={classes.boxPaddingCards}>
            <Grid
              container
              spacing={2}
              justify="flex-start"
              alignContent="stretch"
              alignItems="stretch"
              direction="row"
              display="flex"
            >
              <Grid item lg={4} md={4} sm={6} xl={4} xs={12}>
                <Box className={classes.boxStyle}>
                  <Typography className={classes.cornerTitle}>
                    Количество этажей
                  </Typography>
                  <Typography className={classes.boxValuesText}>
                    {cardsData[0].floor_num}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xl={4} xs={12}>
                <Box className={classes.boxStyle}>
                  <Typography className={classes.cornerTitle}>
                    Количество квартир
                  </Typography>
                  <Typography className={classes.boxValuesText}>
                    {cardsData[0].flat_num}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xl={4} xs={12}>
                <Box className={classes.boxStyle}>
                  <Typography className={classes.cornerTitle}>
                    Количество лифтов
                  </Typography>
                  <Typography className={classes.boxValuesText}>
                    {cardsData[0].elev_num}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xl={4} xs={12}>
                <Box className={classes.boxStyle}>
                  <Typography className={classes.cornerTitle}>
                    Год постройки
                  </Typography>
                  <Typography className={classes.boxValuesText}>
                    {cardsData[0].comm_year}
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xl={4} xs={12}>
                <Box className={classes.boxStyle}>
                  <Typography className={classes.cornerTitle}>
                    Жилая площадь
                  </Typography>
                  <Typography className={classes.boxValuesText}>
                    {cardsData[0].living_area}м2
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xl={4} xs={12}>
                <BuildingHasGas value={cardsData[0].is_gas} />
              </Grid>
            </Grid>
          </Box>
        </>,
      ]
    : [
        <>
          <Box className={classes.boxPaddingLabel}>
            <Typography className={classes.balanceGroupLabel}>
              {address_name}
            </Typography>
          </Box>
          <InfoWindow label="Нет данных" icon="info" />
        </>,
      ];
};

const BuildingHasGas = (props) => {
  const classes = useStyles();
  let value = props.value;

  return value === 1
    ? [
        <Box className={classes.boxStyleGas} style={{ height: "100%" }}>
          <Typography className={classes.cornerTitle}>
            Газифицировано
          </Typography>
          <Typography className={classes.boxValuesText}>
            {/* {input_month} */}
          </Typography>
        </Box>,
      ]
    : [
        <Box className={classes.boxStyleNoGas} style={{ height: "100%" }}>
          <Typography className={classes.cornerTitle}>
            Негазифицировано
          </Typography>
          <Typography className={classes.boxValuesText}>
            {/* {input_month} */}
          </Typography>
        </Box>,
      ];
};

const InfoSectionGS = () => {
  const { globalState } = useContext(Contex);

  return globalState.fiasId !== "" ? [<ShowDataState />] : [<InitialState />];
};

const useStyles = makeStyles((theme) => ({
  boxPaddingLabel: {
    paddingTop: "16px",
    paddingLeft: "16px",
    paddingBottom: "16px",
  },
  boxPaddingCards: {
    paddingLeft: "16px",
    paddingBottom: "16px",
    paddingRight: "16px",
  },
  boxPaddingTabs: {
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  boxStyle: {
    maxWidth: "250px",
    display: "block",
    background: "linear-gradient(127.52deg, #00CAFF 20.68%, #4A9CFF 80.9%);",
    borderRadius: "4px",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
    color: "#FFFFFF",
  },

  boxStyleGas: {
    maxWidth: "250px",
    display: "block",
    background: "linear-gradient(127.52deg, #F19E69 20.68%, #4A9CFF 80.9%)",
    borderRadius: "4px",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
    color: "#FFFFFF",
  },
  boxStyleNoGas: {
    maxWidth: "250px",
    display: "block",
    background: "linear-gradient(127.52deg, #A0A1A2 20.68%, #4A9CFF 80.9%)",
    borderRadius: "4px",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
    color: "#FFFFFF",
  },
  cornerTextCard: {
    position: "relative",
    fontSize: "14px",
    lineHeight: "17px",
    paddingTop: "16px",
    paddingLeft: "16px",
    color: "#252F4A",
    opacity: "0.25",
  },
  cornerTitle: {
    position: "relative",
    fontSize: "14px",
    lineHeight: "17px",
    paddingTop: "9px",
    paddingLeft: "12px",
    color: "#FFFFFF",
  },
  boxValuesText: {
    position: "relative",
    fontSize: "28px",
    lineHeight: "40px",
    fontWeight: "bold",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
    paddingBottom: "10px",
    paddingLeft: "12px",
    color: "#FFFFFF",
  },
  graphText: {
    fontSize: "12px",
    lineHeight: "15px",
    fontWeight: "bold",
    paddingLeft: "16px",
    paddingTop: "21px",
  },
  balanceGroupLabel: {
    fontSize: "14px",
    lineHeight: "17px",
    color: "#252F4A",
  },
}));

export { InfoSectionGS };
