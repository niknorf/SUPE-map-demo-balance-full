import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import BlueDot from "../img/blue-dot.svg";
import YellowDot from "../img/yellow_dot_task.svg";
import GreenDot from "../img/green-dot.svg";
import RedDot from "../img/red_dot_task.svg";
import Dialog from "@material-ui/core/Dialog";

const TaskDialog = (props) => {
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
  if (typeof props.dialogData !== "undefined" && Object.keys(props.dialogData).length !== 0) {
    dialogData = props.dialogData;
  }

  console.log(props.dialogData);

  return (
    <Dialog open={props.isDialogOpen} onClose={props.closeDialog}>
      <div className="modal">
        <div className="content">
          <div className="top">
            <img src={BlueDot} className={classes.taskDot}></img>
            <span className={classes.new}>Новое</span>
            <span className={classes.status}>Изменить статус</span>
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
              <span className={classes.columnContent}>
                {dialogData.date}
              </span>
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
            <Button
              variant="contained"
              color="primary"
              className={classes.feedbackButton}
            >
              Обратная связь
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

export default TaskDialog;
