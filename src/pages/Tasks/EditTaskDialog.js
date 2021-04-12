import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@material-ui/core";
import BlueDot from "assets/img/blue_dot_task.svg";
import YellowDot from "assets/img/yellow_dot_task.svg";
import GreenDot from "assets/img/green_dot_task.svg";
import RedDot from "assets/img/red_dot_task.svg";
import { Dialog, Link } from "@material-ui/core";
import queryString from "querystring";
import { getUserListWithRoles } from "components/keycloak";
import { getSessionCookie } from "components/cookies";
import FeedbackDialog from "components/FeedbackDialog.js";
import { format, parseISO } from "date-fns";
import ServicesTasks from "pages/Tasks/api/ServicesTasks";

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

const EditTaskDialog = props => {
  const [taskStatus, setTaskStatus] = useState(props.dialogData.statusTask);
  const [disabled, setDisabled] = useState(true);
  const [openFeedbackDialog, setFeedbackDialogOpen] = useState(false);
  const [workersList, setWorkersList] = useState([]);
  const [worker, setWorker] = useState("-1");

  const userInfo = getSessionCookie();
  const classes = useStyles();
  //Check if dialogData exists or not
  if (
    typeof props.dialogData !== "undefined" &&
    Object.keys(props.dialogData).length !== 0
  ) {
    dialogData = props.dialogData;
  }

  const handleFeedbackDialogOpen = () => {
    setFeedbackDialogOpen(true);
  };

  const handleFeedbackDialogClose = () => {
    setFeedbackDialogOpen(false);
  };

  const handleWorkerChange = event => {
    setWorker(event.target.value);
  };

  useEffect(() => {
    if (typeof props.dialogData.statusTask !== "undefined") {
      setTaskStatus(props.dialogData.statusTask);
      if (
        props.dialogData.statusTask === 1 ||
        props.dialogData.statusTask === 2
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [props.dialogData.statusTask]);

  useEffect(() => {
    if (userInfo.user_roles.includes("upe_analyst")) {
      ServicesTasks.getWorkerList()
        .then(result => {
          setWorkersList(result);
        })
        .catch(error => {});
    }
  }, []);

  useEffect(() => {
    if (typeof props.dialogData.executorUsers !== "undefined") {
      setWorker(props.dialogData.executorUsers[0].idKeyCloak);
    }
  }, [props.dialogData]);

  const handleTaskStatusChange = dialogData => {
    let taskStatus =
      dialogData.statusTask === 0 || dialogData.statusTask === 3 ? 1 : 2;

    const requestOptions = {
      id: dialogData.id,
      userCreatorId: "a58adc80-4cb8-4b73-84ff-7bc40a9243d7",
      fiasGUID: dialogData.fiasGUID,
      fiasAddress: dialogData.fiasAddress,
      dateString: dialogData.date,
      descriptionTask: dialogData.descriptionTask,
      category: dialogData.category,
      statusTask: taskStatus,
      executorUsersId: [
        typeof dialogData.executorUsers[0] === "undefined"
          ? "b72cf0b5-42c9-4d5c-a135-7d0ac4f04d95"
          : dialogData.executorUsers[0].idKeyCloak
      ]
    };

    ServicesTasks.updateTask(requestOptions)
      .then(result => {
        setTaskStatus(taskStatus);
        console.log(result);
        if (taskStatus === 1 || taskStatus === 2) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      })
      .catch(error => {});

  };

  const TaskStatus = ({ status }) => {
    let dotColor = BlueDot;
    let statusName = "Новое";
    switch (status) {
      case 1: //in progress
        dotColor = YellowDot;
        statusName = "В процессе";
        break;
      case 2: //done
        dotColor = GreenDot;
        statusName = "Выполнено";
        break;
      case 3: //delayed
        dotColor = RedDot;
        statusName = "Просрочено";
        break;
      default:
        dotColor = BlueDot;
        statusName = "Новое";
    }

    return (
      <>
        <img src={dotColor} className={classes.taskDot}></img>
        <span className={classes.new}>{statusName}</span>
      </>
    );
  };

  return (
    <>
      <Dialog open={props.isDialogOpen} onClose={props.closeDialog}>
        <div className="modal">
          <div className="content">
            <div className="top">
              <TaskStatus status={taskStatus} />
              {/* Worker can change status from "new" to 'in progress' or from "delayed" to 'in progress'.
             Done status os set automatcally when the woker sends the response */}
              {userInfo.user_roles.includes("upe_worker") &&
                (taskStatus === 0 || taskStatus === 3) && (
                  <Link
                    component="button"
                    className={classes.status}
                    variant="body2"
                    underline="always"
                    color="primary"
                    onClick={() => {
                      handleTaskStatusChange(dialogData);
                    }}
                  >
                    Изменить статус
                  </Link>
                )}
              <span className={classes.taskNumPopup}>
                Задание №{dialogData.id}
              </span>
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
                className={classes.columnsPopup}
              >
                <span className={classes.columnTitle}>Дата и время</span>
                <span className={classes.columnContent}>{dialogData.date}</span>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xl={6}
                xs={6}
                className={classes.columnsPopup}
              >
                {userInfo.user_roles.includes("upe_analyst") && taskStatus === 0
                  ? [
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
                    ]
                  : [
                      <>
                        <span className={classes.columnTitle}>Исполнитель</span>
                        <span className={classes.columnContent}>
                          {typeof dialogData.executorUsers !== "undefined"
                            ? dialogData.executorUsers[0].lastName
                            : ""}{" "}
                          {typeof dialogData.executorUsers !== "undefined"
                            ? dialogData.executorUsers[0].firstName
                            : ""}
                        </span>
                      </>
                    ]}
              </Grid>
            </Grid>
            <div className={classes.fullWidth}>
              <span className={classes.fullWidthTitle}>Описание обьекта:</span>
              <span className={classes.fullWidthContent}>
                Многоквартирный жилой дом
              </span>
            </div>
            <div className={classes.fullWidth}>
              <span className={classes.fullWidthTitle}>
                Причина создания заявки:
              </span>
              <span className={classes.fullWidthContent}>
                {dialogData.descriptionTask}
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

              {/* Only worker can send the response wehn the task is in progress state, in other state button disabled */}
              {userInfo.user_roles.includes("upe_worker") && dialogData.statusTask === 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  disabled={disabled}
                  className={classes.feedbackButton}
                  onClick={handleFeedbackDialogOpen}
                >
                  Обратная связь
                </Button>
              )}
              {/* Only Analyst is able to see the response when the task is done */}
              {dialogData.statusTask === 2 && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.feedbackButton}
                    onClick={handleFeedbackDialogOpen}
                  >
                    Посмотреть обратную связь
                  </Button>
                )}
            </div>
            <span className={classes.note}>
              {/* * чтобы отправить обратную связь, измените статус задания на “В
            процессе” */}
            </span>
          </div>
        </div>
      </Dialog>
      <FeedbackDialog
        isDialogOpen={openFeedbackDialog}
        closeDialog={handleFeedbackDialogClose}
        dialogData={dialogData}
        closeTaskDialog={props.closeDialog}
      />
    </>
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
    float: "right",
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

export default EditTaskDialog;
