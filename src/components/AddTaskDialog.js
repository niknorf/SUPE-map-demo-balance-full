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
import BlueDot from "assets/img/blue_dot_task.svg";
import YellowDot from "assets/img/yellow_dot_task.svg";
import GreenDot from "assets/img/green_dot_task.svg";
import RedDot from "assets/img/red_dot_task.svg";
import Dialog from "@material-ui/core/Dialog";
import queryString from "querystring";
import { getUserListWithRoles } from "./keycloak";
import { DateTimePicker } from "@material-ui/pickers";
import { getSessionCookie } from "components/cookies";

const AddTaskDialog = (props) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [worker, setWorker] = useState('0');
  const userInfo = getSessionCookie();
  // const [open, setOpen] = useState(false);
  // const [dialogData, setDialogData] = useState({ userCreator: {} });
  const classes = useStyles();

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

  //Check if dialogData exists or not
  if (
    typeof props.dialogData !== "undefined" &&
    Object.keys(props.dialogData).length !== 0
  ) {
    dialogData = props.dialogData;
  }
  // getUserListWithRoles();

  const user_list = [
    {
      username: 'test_worker',
      lastName: "worker",
      firstName: "test",
      id: "887b7bbd-6485-4749-9081-da0704d86dda",
    },
    {
      username: 'worker-1',
      lastName: "Савельев",
      firstName: "Ждан",
      id: "41cc0209-96b2-478d-adf9-c4f5bd51ba13",
    },
    {
      username: 'worker-2',
      lastName: "Ермаков",
      firstName: "Филипп",
      id: "7f10f1ca-023e-415e-9653-8bed184fe8d5",
    },
    {
      username: 'worker-3',
      lastName: "Лукин",
      firstName: "	Юрий",
      id: "5fdfa174-62c7-4375-b139-4e167a639e94",
    },
  ];

  const handleChange = (event) => {
    setWorker(event.target.value);
  };

  const AddTask = (worker) => {

    console.log(dialogData, worker);


    const requestOptions = {
        id: 0,
        userCreatorId: userInfo.sub,
        fiasGUID: dialogData.fias,
        fiasAddress: dialogData.fiasAddress,
        dateString: new Date(),
        descriptionTask: "описание 1",
        category: 0,
        statusTask: 0,
        executorUsersId: [worker]
    };

    axios({
      method: "POST",
      url: '/api/UserTasks/AddTask',
      // data: queryString.stringify(requestOptions),
      data: requestOptions,
      config: {
        headers: {
        'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // props.closeDialog;
      });
  };

  return (
    <Dialog open={props.isDialogOpen} onClose={props.closeDialog}>
      <div className="modal">
        <div className="content">
          <div className="top">
            <img src={BlueDot} className={classes.taskDot}></img>
            <span className={classes.new}>Новое</span>
            {/* Add only if view the task from task page fix margin */}
            {/* <span className={classes.status}></span> */}
            {/* <span className={classes.taskNumPopup}>
              Задание №{dialogData.id}
            </span> */}
          </div>
          <div className={classes.addressPopup}>
            <span className={classes.addressText}>
              {dialogData.fiasAddress}
            </span>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={6} className={classes.columnsPopup}>
              {/* <span className={classes.columnTitle}>Дата и время</span> */}
              <DateTimePicker
                disableToolbar
                label="Дата и время"
                variant="inline"
                value={selectedDate}
                onChange={handleDateChange}
              />
              <span className={classes.columnContent}>{dialogData.date}</span>
            </Grid>
            <Grid item xs={6} className={classes.columnsPopup}>
              <FormControl>
                <InputLabel
                  shrink
                  id="demo-simple-select-placeholder-label-label"
                >
                  Исполнитель
                </InputLabel>
                <Select
                  // labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  value={worker}
                  onChange={handleChange}
                  displayEmpty
                  // className={classes.selectEmpty}
                >
                  <MenuItem value="0">
                  Выберите исполнителя
                  </MenuItem>
                  {user_list.map((user) =>
                    <MenuItem value={user.id}>
                      {user.lastName + " " + user.firstName}
                    </MenuItem>
                  )}

                </Select>
              </FormControl>
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
            <Button
              variant="contained"
              color="primary"
              className={classes.feedbackButton}
              onClick={(event) => AddTask(worker)}
            >
              Создать задание
            </Button>
          </div>
          <span className={classes.note}>
            * чтобы отправить обратную связь, измените статус задания на “В
            процессе”
          </span>
        </div>
      </div>
    </Dialog>
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

export default AddTaskDialog;
