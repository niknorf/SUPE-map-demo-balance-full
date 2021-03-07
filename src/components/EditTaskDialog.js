import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import axios from "axios";
import BlueDot from "../img/blue-dot.svg";
import YellowDot from "../img/yellow_dot_task.svg";
import GreenDot from "../img/green-dot.svg";
import RedDot from "../img/red_dot_task.svg";
import { Dialog, Link } from "@material-ui/core";
import queryString from "querystring";
import { getUserListWithRoles } from "./keycloak";
import { DateTimePicker } from "@material-ui/pickers";
import { getSessionCookie } from "./cookies";
import FeedbackDialog from "./FeedbackDialog.js";

//Default values
let dialogData = {
  id: "",
  fiasAddress: "",
  date: "",
  userCreator: {
    lastName: "",
    firstName: "",
  },
  descriptionTask: "",
};

const EditTaskDialog = (props) => {
  const [taskStatus, setTaskStatus] = useState(props.dialogData.statusTask);
  const [disabled, setDisabled] = useState(true);
  const [openFeedbackDialog, setFeedbackDialogOpen] = useState(false);
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

  const userInfo = getSessionCookie();
  const classes = useStyles();
  const user_list = [
    {
      lastName: "worker",
      firstName: "test",
      id: "887b7bbd-6485-4749-9081-da0704d86dda",
    },
  ];

  const handleTaskStatusChange = (dialogData) => {
    let taskStatus =
      dialogData.statusTask === 0 || dialogData.statusTask === 3 ? 1 : 2;

    const values = {
      id: dialogData.id,
      userCreatorId: dialogData.userCreator.id,
      fiasGUID: dialogData.fiasGUID,
      fiasAddress: dialogData.fiasAddress,
      dateString: dialogData.date,
      descriptionTask: dialogData.descriptionTask,
      category: 0,
      statusTask: taskStatus,
      executorUsersId: [
        typeof dialogData.executorUsers[0] === "undefined"
          ? 4
          : dialogData.executorUsers[0].id,
      ],
    };

    const request = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: queryString.stringify(values),
    };
    fetch("/api/UserTasks/UpdateTask", request)
      .then((response) => response.json())
      .then((data) => {
        setTaskStatus(taskStatus);
        if (taskStatus === 1 || taskStatus === 2) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      });
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

  console.log(userInfo);

  return (<>
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
                    // handleDialogOpen(row);
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
            <Grid item xs={6} className={classes.columnsPopup}>
              <span className={classes.columnTitle}>Дата и время</span>
              <span className={classes.columnContent}>{dialogData.date}</span>
            </Grid>
            <Grid item xs={6} className={classes.columnsPopup}>
              <span className={classes.columnTitle}>Исполнитель</span>
              <span className={classes.columnContent}>
                {dialogData.userCreator.lastName}{" "}
                {dialogData.userCreator.firstName}
              </span>
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
            {userInfo.user_roles.includes("upe_worker") && (
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
            {userInfo.user_roles.includes("upe_analyst") &&
              dialogData.statusTask === 2 && (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.feedbackButton}
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
    />
  </>

  );
};

const useStyles = makeStyles((theme) => ({
  taskDot: {
    marginRight: "6px",
  },
  new: {
    marginRight: "14px",
    fontSize: "14px",
    lineHeight: "42px",
    fontFamily: "PFDinTextCondPro-Bold !important",
  },
  status: {
    marginRight: "62px",
    fontSize: "14px",
    lineHeight: "17px",
    textDecoration: "underline",
  },
  taskNumPopup: {
    fontSize: "14px",
    lineHeight: "17px",
    float: "right",
    fontFamily: "PFDinTextCondPro-Bold !important",
  },
  addressPopup: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "44px",
    paddingBottom: "59px",
    fontSize: "24px",
    lineHeight: "23px",
    color: "#8C949E",
  },
  columnsPopup: {
    display: "flex",
    flexDirection: "column",
  },
  columnTitle: {
    fontSize: "11px",
    lineHeight: "13px",
    color: "#818E9B",
  },
  columnContent: {
    fontSize: "14px",
    lineHeight: "17px",
  },
  fullWidth: {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    lineHeight: "18px",
    marginTop: "24px",
  },
  fullWidthTitle: {
    color: "#818E9B",
  },
  buttons: {
    marginTop: "24px",
    marginBottom: "16px",
    display: "flex",
  },
  exitButton: {
    width: "50%",
    marginRight: "8px",
    color: "#4A9CFF",
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
      color: "#4A9CFF",
    },
  },
  feedbackButton: {
    width: "50%",
    marginLeft: "8px",
    textTransform: "none",
    backgroundColor: "#4A9CFF",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#4A9CFF",
    },
  },
  note: {
    fontSize: "11px",
    lineHeight: "13px",
    color: "#818E9B",
    marginTop: "16px",
  },
}));

export default EditTaskDialog;
