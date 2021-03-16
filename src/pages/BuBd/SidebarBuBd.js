import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Contex from "store/context";
import clsx from "clsx";
import Popup from "reactjs-popup";
import "assets/css/popup.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paper: {
    padding: "20px",
    margin: 0,
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  close: {
    display: "flex",
    justifyContent: "flex-end",
  },
  address: {
    fontSize: "24px",
    lineHeight: "30px",
    fontWeight: "bold",
    marginBottom: "46px",
  },
  probability: {
    fontSize: "14px",
    lineHeight: "17px",
    display: "flex",
  },
  probabilityText: {
    color: "#8C949E",
  },
  probabilityPercent: {
    fontWeight: "bold",
  },
  justificationButton: {
    textTransform: "none",
    textDecoration: "underline",
    fontSize: "14px",
    lineHeight: "17px",
    color: "#252F4A",
    marginTop: "17px",
    marginBottom: "24px",
    justifyContent: "end",
  },
  infoItem: {
    display: "flex",
    fontSize: "14px",
    lineHeight: "17px",
  },
  property: {
    color: "#8C949E",
  },
  value: {
    fontWeight: "bold",
  },
  comment: {
    display: "inline",
  },
  bottomButtons: {
    marginTop: "auto",
  },
  showActButton: {
    width: "100%",
    backgroundColor: "#4A9CFF",
    color: "white",
    textTransform: "none",
    fontWeight: "bold",
    marginBottom: "11px",
    boxShadow: "0px 4px 10px rgba(74, 156, 255, 0.33)",
    "&:hover": {
      backgroundColor: "#4A9CFF",
    },
  },
  createTaskButton: {
    width: "100%",
    backgroundColor: "#FFF",
    color: "#C2CFE0",
    textTransform: "none",
    fontWeight: "bold",
    border: "1px solid #C2CFE0",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#FFF",
    },
    actPopup: {
      width: "800px",
    },
  },
}));

export default function SimplePaper() {
  const { globalState, globalDispach } = useContext(Contex);
  const classes = useStyles();

  const handleClose = () => {
    globalDispach({
      isOpenSidebar: false,
    });
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
      {(close) => (
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

  const ModalAct = () => (
    <Popup
      className="act-popup"
      trigger={
        <Button
          variant="contained"
          color="primary"
          className={classes.showActButton}
        >
          Посмотреть обратную связь
        </Button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <div className="act-content">
            <span className="act-title">Обратная связь</span>
            <div className="address-box">
              <span class="address">Адрес: </span>
              <span class="address-value">
                {globalState.markerValue.address}
              </span>
            </div>
            <FormControl component="fieldset" className="radio">
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value="bd"
                  control={<Radio color="primary" />}
                  label="Бездоговорное потребление"
                />
                <FormControlLabel
                  value="bu"
                  control={<Radio color="primary" />}
                  label="Безучетное потребление"
                />
              </RadioGroup>
            </FormControl>
            <form className="act-date-time" noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                className="act-date-time__field one"
                label="Акт № *"
                placeholder="Введите данные"
              />
              <TextField
                id="standard-basic"
                className="act-date-time__field two"
                label="Дата и время проведения проверки *"
                placeholder="Введите данные"
              />
            </form>
            <form className="characteristics" noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                className="characteristics__field"
                label="Характеристики вводных проводов (кабелей)"
                placeholder="Введите данные"
              />
            </form>
            <FormControl component="fieldset" className="radio tech">
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  className="tech-first"
                  value="consumer"
                  control={<Radio color="primary" />}
                  label="Технические характеристики проводов (кабелей) предоставлены потребителем"
                />
                <FormControlLabel
                  value="visual"
                  control={<Radio color="primary" />}
                  label="Технические характеристики проводов (кабелей) установлены по результатам визуального осмотра"
                />
              </RadioGroup>
            </FormControl>
            <form className="postavki" noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                className="postavki-field"
                label="Р (кВт) в точке поставки"
                placeholder="Введите данные"
              />
            </form>
            <Typography className="comment-label">Комментарии:</Typography>
            <TextField
              id="filled-multiline-static"
              className="comments"
              multiline
              rows={6}
              variant="filled"
            />
            <div className="buttons-bottom">
              <Button
                className="button-button first"
                variant="outlined"
                color="primary"
                onClick={() => {
                  close();
                }}
              >
                Вернуться к карте БУ/БД
              </Button>
              <Button
                className="button-button second"
                variant="contained"
                color="primary"
              >
                Отправить обратную связь
              </Button>
            </div>
            <Typography className="note">
              * - обязательные для заполнения поля
            </Typography>
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
          {globalState.markerValue.address}
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
          <ModalAct />
          <Button
            variant="contained"
            color="primary"
            className={classes.createTaskButton}
          >
            Создать задание
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
