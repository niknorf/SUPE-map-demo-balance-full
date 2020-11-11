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
  Tabs,
  Tab,
} from "@material-ui/core";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import React, { useContext, useEffect, useState } from "react";
import full_res from "../data/graphic/res_imbalance_front.json";
import { makeStyles, useTheme } from "@material-ui/styles";
import PropTypes from "prop-types";
import { BalanceGroupContent } from "./ISTBalanceGroupContent.js";
import TableTemplate from "./TableTemplate";
import { MeteringDevices } from "./ISTMeteringDevices.js";
import { BDProbability } from "./ISTBUBDProbability.js";
import Contex from "../store/context";
import balance_group_items from "../data/balance_result_simple.json";
import InfoWindow from "./InfoWindow.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },

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
    display: "block",
    background: "linear-gradient(127.52deg, #00CAFF 20.68%, #4A9CFF 80.9%);",
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
  balanceGroupLabel: {
    fontSize: "14px",
    lineHeight: "17px",
    color: "#252F4A",
  },
  middleText: {
    wordWrap: "normal",
    fontSize: "18px",
    lineHeight: "23px",
    color: "#8C949E",
  },
}));

const InitialState = () => {
  const classes = useStyles();
  return (
    <Grid item lg={12} md={12} sm={6} xl={12} xs={12}>
      <Paper elevation={1} style={{ height: "100%" }}>
        <Typography className={classes.cornerTextCard}>
          Балансовая группа
        </Typography>
        <InfoWindow
          label="Чтобы посмотреть балансовую группу, выберите обьект на карте или
          воспользуйтесь поиском или таблицей"
          icon="info"
        />
      </Paper>
    </Grid>
  );
};

const WarningState = ({ label }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      lg={12}
      md={12}
      sm={6}
      xl={12}
      xs={12}
      style={{ height: "100%" }}
    >
      <Paper elevation={1}>
        <Typography className={classes.cornerTextCard}>
          Балансовая группа
        </Typography>
        <InfoWindow label={label} icon="triangle" />
      </Paper>
    </Grid>
  );
};

const ShowDataState = () => {
  const classes = useStyles();
  const [rows, setBgContent] = useState([]);
  const [value, setValue] = useState(0);
  const [input_month, setInputMonth] = useState("0");
  const [imbalance_kwh, setImbalance] = useState("0");
  const { globalState } = useContext(Contex);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const balance_id = globalState.balance_index;

  const address_name =
    globalState.building_address !== ""
      ? "(" + globalState.building_address + ")"
      : "";

  useEffect(() => {
    if (globalState.balance_index !== "") {
      // fetch("/api/Results/GetBalanceResultFull/" + globalState.balance_index)
      //   .then((res) => res.json())
      //   .then(
      //     (result) => {
      //       // translateText(result);
      //     },
      //     // Note: it's important to handle errors here
      //     // instead of a catch() block so that we don't swallow
      //     // exceptions from actual bugs in components.
      //     (error) => {
      //       // setLoading(true);
      //       // setError(error);
      //     }
      //   );

      fetch("/api/Results/GetResImbalanceFrontKWH/" + globalState.balance_index)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.length > 0) {
              /*TODO set values*/
              setInputMonth(result.input_month);
              setImbalance(result.imbalance_kwh);
            }
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
            <Paper elevation={1}>
              <Box className={classes.boxPaddingLabel}>
                <Typography className={classes.balanceGroupLabel}>
                  Балансовая группа №{balance_id} {address_name}
                </Typography>
              </Box>
              <Box className={classes.boxPaddingCards}>
                <Grid
                  container
                  spacing={3}
                  justify="flex-start"
                  alignContent="center"
                  alignItems="center"
                  direction="row"
                  wrap="wrap"
                >
                  <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
                    <Box className={classes.boxStyle}>
                      <Typography className={classes.cornerTitle}>
                        Небалансы
                      </Typography>
                      <Typography className={classes.boxValuesText}>
                        {imbalance_kwh} кВтч
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
                    <Box className={classes.boxStyle}>
                      <Typography className={classes.cornerTitle}>
                        Отпуск в сеть
                      </Typography>
                      <Typography className={classes.boxValuesText}>
                        {input_month} кВтч
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Paper elevation={1}>
              <Box className={classes.boxPaddingTabs}>
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  aria-label="simple tabs example"
                  indicatorColor="#4A9CFF"
                  TabIndicatorProps={{ style: { background: "#4A9CFF" } }}
                  style={{ width: "100%" }}
                >
                  <Tab
                    style={{ textTransform: "none" }}
                    label="Состав балансовой группы"
                    {...a11yProps(0)}
                  />
                  <Tab
                    style={{ textTransform: "none" }}
                    label="Приборы учета"
                    {...a11yProps(1)}
                  />
                  <Tab
                    style={{ textTransform: "none" }}
                    label="Вероятность БУ/БД"
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <BalanceGroupContent />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <MeteringDevices />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <BDProbability />
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const InfoSection = () => {
  const [network_imbalance, setNetworkImbalance] = useState([]);
  const { globalState } = useContext(Contex);

  return (
    <>
      {(() => {
        if (globalState.isPhantomic && globalState.balance_index === "") {
          return (
            <WarningState label="Не удалось определить балансовую группу для выбранного обьекта" />
          );
        } else if (
          globalState.balance_index === "" &&
          globalState.isClean === "balance_id_not_found"
        ) {
          return <WarningState label="balance_id_not_found" />;
        } else if (!globalState.isClean && globalState.balance_index !== "") {
          return (
            <WarningState label="Рекомендуем проверить наличие ПУ в данной балансовой группе и при необходимости доставить их, с целью расчета небалансов" />
          );
        }
        if (globalState.balance_index !== "" && globalState.isClean) {
          return <ShowDataState />;
        } else {
          return <InitialState />;
        }
      })()}
    </>
  );
};

export { InfoSection, WarningState };
