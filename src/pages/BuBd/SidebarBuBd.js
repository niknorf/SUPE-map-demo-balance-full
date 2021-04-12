import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Box,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Contex from "store/context";
import clsx from "clsx";
import Popup from "reactjs-popup";
import AddTaskDialog from "pages/Tasks/AddTaskDialog.js";
import "assets/css/popup.css";
import { getSessionCookie } from "components/cookies";

//Components returs the sidebar with additional info for the clicked item from the TableBuBd component
export default function SidebarBuBd() {
  const [dialogData, setDialogData] = useState({});
  const [openDialog, setOpen] = useState(false);
  const { globalState, globalDispach } = useContext(Contex);
  const classes = useStyles();
  const userInfo = getSessionCookie();

//Function handling closing the sidebar
  const handleClose = () => {
    globalDispach({
      isOpenSidebar: false
    });
  };
//Function handles opening the AddTaskDialog
  const handleDialogOpen = row => {
    setOpen(true);
    setDialogData(row);
  };
//Function handles the closing of AddTaskDialog
  const handleDialogClose = () => {
    setOpen(false);
    setDialogData({});
  };

  var description;
  var percent;

  if (
    globalState.markerValue.percent_probability_BU >
    globalState.markerValue.percent_probability_BD
  ) {
    description = "Вероятность безучетного потребления (%): ";
    percent = globalState.markerValue.percent_probability_BU;
  } else {
    description = "Вероятность бездоговорного потребления (%): ";
    percent = globalState.markerValue.percent_probability_BD;
  }

  const Modal = () => (
    <Popup
      trigger={
        <Button
          className={classes.justificationButton}
          startIcon={<InfoOutlinedIcon style={{ color: "#4A9CFF" }} />}
        >
          Обоснование
        </Button>
      }
      modal
      nested
    >
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="content">
            <span className="title">Обоснование</span>
            <div className="info">
              <table>
                <tr>
                  <th align="left">Входные данные</th>
                  <th align="left">Значимость</th>
                </tr>
                <tr>
                  <td>Индекс доверия гарантирующих поставщиков (физ.лица)</td>
                  <td>{globalState.markerValue.importance_PSK_fiz_face}%</td>
                </tr>
                <tr>
                  <td>Индекс доверия гарантирующих поставщиков (юр.лица)</td>
                  <td>{globalState.markerValue.importance_PSK_ur_face}%</td>
                </tr>
                <tr>
                  <td>Индекс доверия гарантирующих поставщиков (ОДН)</td>
                  <td>{globalState.markerValue.importance_PSK_ODN}%</td>
                </tr>
                <tr>
                  <td>
                    Процент передачи показаний приборов технического учета
                  </td>
                  <td>{globalState.markerValue.percent_transmission_PU}%</td>
                </tr>
                <tr>
                  <td>Сезонность</td>
                  <td>нет</td>
                </tr>
                <tr>
                  <td>Производственный календарь</td>
                  <td>{globalState.markerValue.holidays}%</td>
                </tr>
                <tr>
                  <td>
                    Профиль гарантирующих поставщиков (показания за месяц)
                  </td>
                  <td>{globalState.markerValue.data_PSK}%</td>
                </tr>
                <tr>
                  <td>Небаланс в балансовой группе</td>
                  <td>{globalState.markerValue.imbalance}%</td>
                </tr>
                <tr>
                  <td>данные SPARK</td>
                  <td>{globalState.markerValue.SPARK}%</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Box className={classes.close}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography className={classes.address}>
          {globalState.markerValue.fiasAddress}
        </Typography>
        <Box className={classes.probability}>
          <Typography className={classes.probabilityText}>
            {description}
          </Typography>
          <Typography className={classes.probabilityPercent}>
            {percent}
          </Typography>
        </Box>

        <Modal />

        <Box>
          <Box className={classes.infoItem}>
            <Typography className={classes.property}>
              Период прогнозирования: &nbsp;
            </Typography>
            <Typography className={classes.value}>
              {/* авг.20 */}
              {globalState.markerValue.date_month}.
              {globalState.markerValue.date_year}
            </Typography>
          </Box>
          <Box className={classes.infoItem}>
            <Typography className={classes.property}>ТП: &nbsp;</Typography>
            <Typography className={classes.value}>
              {globalState.markerValue.TP}
            </Typography>
          </Box>
          <Box className={clsx(classes.infoItem, classes.comment)}>
            <Typography className={classes.property}>
              Информация: &nbsp;
            </Typography>
            <Typography className={classes.value}>
              {globalState.markerValue.information}
            </Typography>
          </Box>
          <Box className={classes.infoItem}>
            <Typography className={classes.property}>
              Количество этажей: &nbsp;
            </Typography>
            <Typography className={classes.value}>
              {globalState.markerValue.floors}
            </Typography>
          </Box>
          <Box className={clsx(classes.infoItem, classes.comment)}>
            <Typography className={classes.property}>
              Комментарии: &nbsp;
            </Typography>
            <Typography className={classes.value}>
              {globalState.markerValue.comments}
            </Typography>
          </Box>
        </Box>
        <Box className={classes.bottomButtons}>
          {/* Only analyst can add the task */}
          {userInfo.user_roles.includes("upe_analyst") && (
            <Button
              variant="contained"
              color="primary"
              className={classes.createTaskButton}
              onClick={() => {
                handleDialogOpen({
                  fias: globalState.markerValue.fiasGUID,
                  fiasAddress: globalState.markerValue.fiasAddress,
                  information: globalState.markerValue.information
                });
              }}
            >
              Создать задание
            </Button>
          )}
        </Box>
      </Paper>
      <AddTaskDialog
        isDialogOpen={openDialog}
        closeDialog={handleDialogClose}
        dialogData={dialogData}
      />
      ,
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: 'left',
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  },
  paper: {
    padding: "20px",
    margin: 0,
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  close: {
    display: "flex",
    justifyContent: "flex-end"
  },
  address: {
    fontSize: "24px",
    lineHeight: "30px",
    fontWeight: "bold",
    marginBottom: "46px"
  },
  probability: {
    fontSize: "14px",
    lineHeight: "17px",
    display: "flex"
  },
  probabilityText: {
    color: "#8C949E"
  },
  probabilityPercent: {
    fontWeight: "bold"
  },
  justificationButton: {
    textTransform: "none",
    textDecoration: "underline",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#252F4A",
    marginTop: "17px",
    marginBottom: "24px",
    justifyContent: "end"
  },
  infoItem: {
    display: "flex",
    fontSize: "14px",
    lineHeight: "17px"
  },
  property: {
    color: "#8C949E"
  },
  value: {
    fontWeight: "bold"
  },
  comment: {
    display: "inline"
  },
  bottomButtons: {
    marginTop: "auto"
  },
  createTaskButton: {
    border: "1px solid #4764B0",
    boxSizing: "border-box",
    borderRadius: "4px",
    width: "100%",
    backgroundColor: "#FFF",
    color: "#4764B0",

    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#FFFFFF"
    }
  }
}));
