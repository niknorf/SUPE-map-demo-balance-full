import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  TextField,
  Typography,
  Radio
} from "@material-ui/core";
import axios from "axios";
import { Dialog, Link } from "@material-ui/core";
import queryString from "querystring";
import { getUserListWithRoles } from "components/keycloak";
import { DateTimePicker } from "@material-ui/pickers";
import { getSessionCookie } from "components/cookies";
import ServicesTasks from "pages/Tasks/api/ServicesTasks";
import "assets/css/popup.css";

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

const FeedbackDialog = props => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const userInfo = getSessionCookie();
  const classes = useStyles();

  // Check if dialogData exists or not
  if (
    typeof props.dialogData !== "undefined" &&
    Object.keys(props.dialogData).length !== 0
  ) {
    dialogData = props.dialogData;
  }

  const handleFeedbackReasonChange = event => {
    setReason(event.target.value);
  };

  const handleFeedbackDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handleFeedbackSend = () => {
    const requestOptions = {
      descrition: description,
      reason: reason,
      userId: "b72cf0b5-42c9-4d5c-a135-7d0ac4f04d95",
      taskId: 27
    };

    const requestOptionsTask = {
      id: dialogData.id,
      userCreatorId: dialogData.userCreator.idKeyCloak,
      fiasGUID: dialogData.fiasGUID,
      fiasAddress: dialogData.fiasAddress,
      dateString: dialogData.date,
      descriptionTask: dialogData.descriptionTask,
      category: dialogData.category,
      statusTask: 2, //move to done
      executorUsersId: [
        typeof dialogData.executorUsers[0] === "undefined"
          ? "b72cf0b5-42c9-4d5c-a135-7d0ac4f04d95"
          : dialogData.executorUsers[0].idKeyCloak
      ]
    };

    ServicesTasks.createFeedback(requestOptions)
      .then(result => {
        ServicesTasks.updateTask(requestOptionsTask)
          .then(result => {
            props.closeDialog();
            props.closeTaskDialog();
          })
          .catch(error => {});
      })
      .catch(error => {});
  };

//Load feedbackdata
  useEffect(() => {
    //Load only when the task is completed
    if(dialogData.statusTask === 2){
      ServicesTasks.getFeedback(dialogData.id)
        .then(result => {
          setDescription(result[0].descrition);
          setReason(result[0].reason)
          // props.closeDialog();
          // props.closeTaskDialog();
        })
        .catch(error => {});
    }

    }, [props.isDialogOpen]);

  return (
    <Dialog open={props.isDialogOpen} onClose={props.closeDialog}>
      <div className="modal">
        <div className="content">
          <div className="top">
            <span className={classes.title}>Обратная связь от Исполнителя</span>
            <span className={classes.taskNumPopup}>
              Задание №{dialogData.id}
            </span>
            <div className="address-box">
              <span class="address">Адрес: </span>
              <span className={classes.addressText}>
                {dialogData.fiasAddress}
              </span>
            </div>
            <Grid container spacing={3}>
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
                    label="Описание обращения"
                    multiline
                    required
                    rows={2}
                    value={description}
                    onChange={handleFeedbackDescriptionChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    defaultValue=""
                  />
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
                    label="Описание причины"
                    multiline
                    required
                    rows={2}
                    value={reason}
                    onChange={handleFeedbackReasonChange}
                    InputLabelProps={{
                      shrink: true
                    }}
                    defaultValue=""
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="position"
                name="compsumption_type"
                defaultValue="bd"
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
            /> */}
            <div className="buttons-bottom">
              <Button
                className="button-button first"
                variant="outlined"
                color="primary"
                onClick={props.closeDialog}
              >
                Выйти
              </Button>
              {/* Sending the feedback possible only if the task is in progress */}
              {dialogData.statusTask === 1 && (
                <Button
                  className="button-button second"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleFeedbackSend();
                  }}
                >
                  Отправить обратную связь
                </Button>
              )}
            </div>
            <Typography className="note">
              * - обязательные для заполнения поля
            </Typography>
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
  title: {
    fontSize: "24px",
    lineHeight: "29px"
  },
  addressText: {
    fontWeight: "bold"
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

export default FeedbackDialog;
