import "pages/BuBd/css/mapBuBd.css";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Icon } from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import SidebarBuBd from "pages/BuBd/SidebarBuBd";
import { TableBuBd } from "pages/BuBd/TableBuBd";
import Contex from "store/context";
import MapBuBd from "pages/BuBd/MapBuBd";
import Popover from "@material-ui/core/Popover";

//Component that renders the bubd page
export default function BuBd() {
  const classes = useStyles();
  const { globalState } = useContext(Contex);

  return (
      <Grid container
        display="flex"
        >
        <Grid
          item
          lg={4}
          md={4}
          sm={5}
          xl={4}
          xs={12}
        >
          <Paper className={classes.paper}>
            {globalState.isOpenSidebar ?  <SidebarBuBd /> :  null}
            <div style={{ display: (globalState.isOpenSidebar ? 'none' : 'block') }}>
            <TableBuBd key='tablebubd-component'/>
          </div>
          </Paper>
        </Grid>
        <Grid
          item
          lg={8}
          md={8}
          sm={7}
          xl={8}
          xs={12}
          >
          <MapBuBd />
        </Grid>
      </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
    },
  mapWithTableGrid: {
    height: "100vh",
    position: "relative"
  },
  info: {
    position: "absolute",
    left: "47%",
    top: "12px",
    textTransform: "none",
    zIndex: 99,
    color: "#4A9CFF",
    boxShadow: "4px 6px 18px rgba(0, 0, 0, 0.06)",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white"
    }
  },
  popover: {
    margin: "16px"
  },
  clusterWrapper: {
    display: "flex",
    width: "30px",
    height: "30px",
    marginRight: "14px"
  },
  clusterMarkerIcon: {
    width: "30px"
  },
  markerWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    height: "18px"
  },
  markerIcon: {
    width: "18px"
  },
  description: {
    padding: "0 !important;"
  }
}));
