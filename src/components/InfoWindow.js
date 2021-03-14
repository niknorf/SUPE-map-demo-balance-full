import { Typography, Box, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import info_icon from "assets/img/info_icon.svg";
import triangle_icon from "assets/img/triangle_icon.svg";

const useStyles = makeStyles((theme) => ({
  boxMiddleTextCard: {
    paddingLeft: "16px",
    paddingRight: "16px",
    paddingBottom: "60px",
    paddingTop: "40px",
  },
  imageIcon: {
    width: 15,
    height: 15,
  },
  middleText: {
    wordWrap: "normal",
    fontSize: "18px",
    lineHeight: "23px",
    color: "#8C949E",
  },
}));

export default function InfoWindow(props) {
  const classes = useStyles();
  let icon = info_icon;

  props.icon === 'triangle'? icon = triangle_icon : icon = info_icon;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      className={classes.boxMiddleTextCard}
    >
      <Box m="auto">
        <Icon>
          <img className={classes.imageIcon} src={icon} alt="" />
        </Icon>
      </Box>
      <Box m="auto">
        <Typography align="center" className={classes.middleText}>
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
};
