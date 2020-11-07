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
// import { MeteringDevices } from "./ISTMeteringDevices.js";
import { BDProbability } from "./ISTBUBDProbability.js";
import Contex from "../store/context";
import balance_group_items from "../data/balance_result_simple.json";
import info_icon from "../img/info_icon.svg";
import triangle_icon from "../img/triangle_icon.svg";

const useStyles = makeStyles((theme) => ({
  imageIcon: {
    width: 15,
    height: 15,
    // position: "relative",
    // paddingTop: 81,
    // paddingLeft: 16,
  },
  iconRoot: {
    margin: "auto",
  },
  table: {
    minWidth: 150,
    borderBottom: "none",
  },
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
    // margin: "auto",
    // alignItems: "center",
    display: "block",
    background: "linear-gradient(127.52deg, #00CAFF 20.68%, #4A9CFF 80.9%);",
    // paddingLeft: '12px',
    // paddingTop: '9px',
    // height: 80,
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
    // paddingTop: "30px",
    paddingBottom: "10px",
    paddingLeft: "12px",
    color: "#FFFFFF",
  },
  boxMiddleTextCard: {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "60px",
    paddingTop: "40px",
    // position: "absolute",
    // height: "40px",
    // marginTop: "30px",
    // marginLeft: "12px",
    // marginRight: "33px",
    // fontFamily: "PF Din Text Cond Pro",
    // fontStyle: "normal",
    // fontWeight: "bold",
    // fontSize: "32px",
    // lineHeight: "40px",
    // textShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
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

  paperInfo: {
    // minHeight:
    // height: "17vh",
  },

  tabsContainer: {
    background: "#F1F2F3",
    height: "40px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "8px",
    fontFamily: "PF Din Text Cond Pro",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "14px",
    color: "#252F4A",
    textTransform: "none",
  },

  // boxStyle: {
  //   // height: "60vh",
  //   padding: "15px",
  //   margin: "auto",
  // },
}));

const InitialState = () => {
  const classes = useStyles();
  return (
    <Grid item lg={12} md={12} sm={6} xl={12} xs={12}>
        <Paper elevation={1} className={classes.paperInfo} style={{ height: "100%" }}>
          <Typography className={classes.cornerTextCard}>
            Балансовая группа
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignContent="center"
            alignItems="center"
            className={classes.boxMiddleTextCard}
          >
            <Box m="auto">
              <Icon>
                <img className={classes.imageIcon} src={info_icon} alt="" />
              </Icon>
            </Box>
            <Box m="auto">
              <Typography align="center" className={classes.middleText}>
                Чтобы посмотреть балансовую группу, выберите обьект на карте или
                воспользуйтесь поиском или таблицей
              </Typography>
            </Box>
          </Box>
        </Paper>
    </Grid>
  );
};

const WarningState = ({ label }) => {
  const classes = useStyles();

  return (
    <Grid item lg={12} md={12} sm={6} xl={12} xs={12} style={{ height: "100%" }}>
      <Paper elevation={1} className={classes.paperInfo}>
        <Typography className={classes.cornerTextCard}>
          Балансовая группа
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignContent="center"
          className={classes.boxMiddleTextCard}
        >
          <Box m="auto">
            <Icon>
              <img className={classes.imageIcon} src={triangle_icon} alt="" />
            </Icon>
          </Box>
          <Box m="auto">
            <Typography align="center" className={classes.middleText}>
              {label}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

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

const ShowDataState = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [value, setValue] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { globalState } = useContext(Contex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const balance_id = globalState.balance_index;

  const address_name =
    globalState.building_address !== ""
      ? "(" + globalState.building_address + ")"
      : "";

  // let value  = full_res.map(function(item) {
  //   if(item.balance_id.toString() === balance_id.toString() && item.year === 2020){
  //     return item;
  //   }
  // });

  let input_month = 0;
  let imbalance_kwh = 0;

  let temp_array = [];

  /*TODO SEARCHED BASED ON LATERS MONTH AND YEAR*/
  for (var i = 0; i < full_res.length; i++) {
    if (
      full_res[i].balance_id.toString() === balance_id.toString() &&
      full_res[i].year === 2020 &&
      full_res[i].month === "Июл"
    ) {
      // temp_array.push(full_res[i])
      /*Temp solution waiting fro month_number inside res_imbalance_front*/
      input_month = full_res[i].input_month;
      imbalance_kwh = full_res[i].imbalance_kwh;
    }
  }
  /*DO NOT REMOVE*/
  // const max = temp_array.reduce(function(prev, current) {
  // return (prev.month > current.month) ? prev : current
  // });
  //
  // for(var i=0; i < temp_array.length; i++){
  //   if(full_res[i].month === max.month){
  //     console.log(full_res[i]);
  //     input_month = full_res[i].input_month;
  //     imbalance_kwh = full_res[i].imbalance_kwh;
  //   }
  // }
  var rows = [];

  balance_group_items.map((item) => {
    if (item.balance_index.toString() === balance_id.toString()) {
      rows.push(createData(item.name, item.type));
    }
    return item;
  });

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
                  onChange={handleChange}
                  aria-label="simple tabs example"
                  // indicatorColor="#4A9CFF"
                  TabIndicatorProps={{ style: { background: "#4A9CFF" } }}
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
                <TabPanel value={value} index={0}>
                  <BalanceGroupContent />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  В разработке
                  {/* <MeteringDevices /> */}
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <BDProbability />
                </TabPanel>
              </Box>
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

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const InfoSection = () => {
  const [network_imbalance, setNetworkImbalance] = useState([]);
  // const [imbalance, setSubstation] = useState('');
  const { globalState } = useContext(Contex);

  useEffect(() => {
    if (globalState.balance_index !== "" && globalState.isClean) {
      /*TODO set loading true, creating loading for whoel page*/
      // setLoading(true);

      console.log(globalState.balance_index);

      fetch("/api/Results/GetResImbalanceFrontKWH/" + globalState.balance_index)
        .then((res) => res.json())
        .then(
          (result) => {
            //method for небалансы отпуск в сеть
            // console.log(result);
            // setNetworkImbalance(result);
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
  }, [globalState.balance_index, globalState.isClean]);

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

export { InfoSection };
