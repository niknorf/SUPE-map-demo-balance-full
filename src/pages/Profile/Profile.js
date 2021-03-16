import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Box, Link, Button } from "@material-ui/core";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import Popup from "reactjs-popup";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { getSessionCookie } from "components/cookies";

export default function ProfileNoAuth() {
  const classes = useStyles();

  const userInfo = getSessionCookie();

  const roleTranslator = [];
  roleTranslator['upe_worker'] = "Исполнитель";
  roleTranslator['upe_analyst'] = "Аналитик";
  roleTranslator['upe_manager'] = "Менеджер";

  const Modal = () => (
    <Popup
      trigger={
        <Button
          className={classes.justificationButton}
          startIcon={<InfoOutlinedIcon style={{ color: "#4A9CFF" }} />}
        >
          Информация о системе
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
            <span className="title">Информация о системе</span>
            <div className="info">
              <table>
                <tr></tr>
                <tr>
                  <td>Полное наименование:</td>
                  <td>
                    Информационная система управления передачей электроэнергии с
                    использованием технологий “больших данных” ПАО «Россети
                    Ленэнерго».
                  </td>
                </tr>
                <tr>
                  <td>Краткое наименование:</td>
                  <td>УПЭ.</td>
                </tr>
                <tr>
                  <td>Описание:</td>
                  <td>
                    Система УПЭ адаптирует результаты работы нейросети по
                    обнаружению безучетного/бездоговорного потребления в
                    доступном и удобном для понимания виде, а также преобразует
                    систему задач в электронный формат. В системе УПЭ реализован
                    эргономичный человеко-машинного интерфейс в области
                    визуализации и анализа транспорта электроэнергии.
                  </td>
                </tr>
                <tr>
                  <td>Разработчики:</td>
                  <td>
                    АО "ФИЦ" info@ftc-energo.ru; ФГБОУ ВолгГТУ
                    maxim.shcherbakov@gmail.com
                  </td>
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography component="div" className={classes.outerBox}>
              <Box fontSize="32px" lineHeight="38px" marginBottom="24px">
                Личный кабинет
              </Box>
              <Box fontSize="24px" lineHeight="29px" marginBottom="24px">
                Данные пользователя
              </Box>
              <Box className={classes.profileInfo}>
                <Box className={classes.properties}>
                  <Box>Имя, Фамилия</Box>
                  {/* <Box>Фамилия</Box> */}
                  <Box>Роль</Box>
                </Box>
                <Box className={classes.data}>
                  <Box>{userInfo.given_name + " " + userInfo.family_name} </Box>
                  {/* <Box> {"\n"}</Box> */}
                  <Box>{roleTranslator[userInfo.user_roles[2]]}</Box>
                </Box>
              </Box>
              <Box className={classes.links}>
                {/* <Link href="#" className={classes.link}>
                  <InfoOutlined style={{ fontSize: '17px', marginRight: '6px', color: '#4A9CFF' }} />
                  Информация о системе
                </Link> */}
                <Modal />
                <Button className={classes.justificationButton}>
                  <Link
                    href="Руководство пользователя.docx"
                    download
                    className={classes.link}
                  >
                    <InfoOutlined
                      style={{ marginRight: "6px", color: "#4A9CFF" }}
                    />
                    Руководство пользователя
                  </Link>
                </Button>
              </Box>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "38px 40px 0"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left"
  },
  profileInfo: {
    display: "flex",
    marginBottom: "40px"
  },
  properties: {
    marginRight: "39px",
    fontWeight: "bold"
  },
  links: {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    lineHeight: "17px"
  },
  link: {
    display: "flex",
    color: "#252F4A",
    textDecoration: "underline",
    marginBottom: "17px"
  },
  outerBox: {
    padding: "74px 77px 50px;"
  },
  close: {
    display: "flex",
    justifyContent: "flex-end"
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
  }
}));
