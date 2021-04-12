import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField
} from "@material-ui/core";
import BlueDot from "assets/img/blue_dot_task.svg";
import YellowDot from "assets/img/yellow_dot_task.svg";
import GreenDot from "assets/img/green_dot_task.svg";
import RedDot from "assets/img/red_dot_task.svg";
import Dialog from "@material-ui/core/Dialog";
import queryString from "querystring";
import { getUserListWithRoles } from "components/keycloak";
import { DatePicker } from "@material-ui/pickers";
import { getSessionCookie } from "components/cookies";
import ServicesTasks from "pages/Tasks/api/ServicesTasks";

const AddTaskDialog = props => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [taskReason, setTaskReason] = useState("");
  const [workersList, setWorkersList] = useState([]);
  const [worker, setWorker] = useState("-1");
  const [category, setCategory] = useState("-1");
  const userInfo = getSessionCookie();
  const classes = useStyles();

  useEffect(() => {
    ServicesTasks.getWorkerList()
      .then(result => {
        setWorkersList(result);
      })
      .catch(error => {});
  }, []);

  //Default values
  let dialogData = {
    id: "",
    fiasAddress: "",
    date: "",
    userCreator: {
      lastName: "",
      firstName: ""
    },
    descriptionTask: ""
  };

  //Check if dialogData exists or not
  if (
    typeof props.dialogData !== "undefined" &&
    Object.keys(props.dialogData).length !== 0
  ) {
    dialogData = props.dialogData;
  }

  const handleWorkerChange = event => {
    setWorker(event.target.value);
  };
  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };
  const handleTaskReasonChange = event => {
    setTaskReason(event.target.value);
  };

  const AddTask = () => {
    const requestOptions = {
      id: 0,
      userCreatorId: userInfo.sub,
      fiasGUID: dialogData.fias,
      fiasAddress: dialogData.fiasAddress,
      dateString: selectedDate,
      descriptionTask: taskReason,
      category: parseInt(category),
      statusTask: 0,
      executorUsersId: [worker]
    };

    ServicesTasks.createTask(requestOptions)
      .then(result => {
        if (result === "") {
          props.closeDialog();
        }
        console.log(result);
      })
      .catch(error => {});
  };

  return (
    <Dialog open={props.isDialogOpen} onClose={props.closeDialog}>
      <div className="modal">
        <div className="content">
          <div className="top">
            <img src={BlueDot} className={classes.taskDot}></img>
            <span className={classes.new}>Новое</span>
          </div>
          <div className={classes.addressPopup}>
            <span className={classes.addressText}>
              {dialogData.fiasAddress}
            </span>
          </div>
          <Grid container spacing={3}>
            <Grid
              item
              lg={6}
              md={6}
              sm={6}
              xl={6}
              xs={6}
              spacing={3}
              className={classes.columnsPopup}
              >
              <DatePicker
                disableToolbar
                label="Плановая дата исполнения"
                variant="inline"
                minDate={new Date()}
                value={selectedDate}
                onChange={handleDateChange}
              />
              {/* <span className={classes.columnContent}>{dialogData.date}</span> */}
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              sm={6}
              xl={6}
              xs={6}
              spacing={3}
              className={classes.columnsPopup}
              >
              <FormControl>
                <InputLabel shrink id="user_worker_label" required>
                  Исполнитель
                </InputLabel>
                <Select
                  id="user_worker_select"
                  value={worker}
                  onChange={handleWorkerChange}
                  displayEmpty
                  required
                >
                  <MenuItem value="-1">Выбрать</MenuItem>
                  {workersList.map(user => (
                    <MenuItem value={user.idKeyCloak}>
                      {user.lastName + " " + user.firstName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xl={12}
              xs={12}
              spacing={3}
              className={classes.columnsPopup}
              >
              <FormControl>
                <InputLabel shrink id="user_category_label" required>
                  Набор действий исполнителя
                </InputLabel>
                <Select
                  id="user_category_select"
                  value={category}
                  onChange={handleCategoryChange}
                  displayEmpty
                  required
                >
                  <MenuItem value="-1">Выбрать</MenuItem>
                  <MenuItem value="0">Не имеет категории</MenuItem>
                  <MenuItem value="1">
                    Выверка электрической схемы в ГИС
                  </MenuItem>
                  <MenuItem value="2">Для исполнения в ПЭК</MenuItem>
                  <MenuItem value="3">
                    Требуется установка контрольных ПУ
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xl={12}
              xs={12}
              spacing={3}
              className={classes.columnsPopup}
              >
              <FormControl>
                <TextField
                  id="standard-multiline-static"
                  label="Причина создания заявки"
                  multiline
                  required
                  rows={2}
                  value={taskReason}
                  onChange={handleTaskReasonChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                  defaultValue=""
                />
              </FormControl>
            </Grid>
          </Grid>
          <div className={classes.fullWidth}>
            <InputLabel shrink id="user_worker_label">
              Описание обьекта
            </InputLabel>
            <span className={classes.fullWidthContent}>
              {typeof dialogData.information !== "undefined"
                ? dialogData.information
                : "Многоквартирный жилой дом"}
            </span>
          </div>
          <div className={classes.buttons}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.exitButton}
              onClick={props.closeDialog}
            >
              Выйти
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.feedbackButton}
              onClick={event => AddTask()}
            >
              Создать задание
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

const useStyles = makeStyles(theme => ({
  taskDot: {
    marginRight: "6px"
  },
  new: {
    marginRight: "14px",
    fontSize: "14px",
    lineHeight: "42px",
    fontFamily: "PFDinTextCondPro-Bold !important"
  },
  status: {
    marginRight: "62px",
    fontSize: "14px",
    lineHeight: "17px",
    textDecoration: "underline"
  },
  taskNumPopup: {
    fontSize: "14px",
    lineHeight: "17px",
    fontFamily: "PFDinTextCondPro-Bold !important"
  },
  addressPopup: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "44px",
    paddingBottom: "59px",
    fontSize: "24px",
    lineHeight: "23px",
    color: "#8C949E"
  },
  columnsPopup: {
    display: "flex",
    flexDirection: "column"
  },
  columnTitle: {
    fontSize: "11px",
    lineHeight: "13px",
    color: "#818E9B"
  },
  columnContent: {
    fontSize: "14px",
    lineHeight: "17px"
  },
  fullWidth: {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    lineHeight: "18px",
    marginTop: "24px"
  },
  fullWidthTitle: {
    color: "#818E9B"
  },
  buttons: {
    marginTop: "24px",
    marginBottom: "16px",
    display: "flex"
  },
  exitButton: {
    width: "50%",
    marginRight: "8px",
    color: "#4A9CFF",
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
      color: "#4A9CFF"
    }
  },
  feedbackButton: {
    width: "50%",
    marginLeft: "8px",
    textTransform: "none",
    backgroundColor: "#4A9CFF",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#4A9CFF"
    }
  },
  note: {
    fontSize: "11px",
    lineHeight: "13px",
    color: "#818E9B",
    marginTop: "16px"
  }
}));

export default AddTaskDialog;
