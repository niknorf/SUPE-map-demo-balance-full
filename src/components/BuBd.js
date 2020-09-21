import "../css/mapBuBd.css";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import React, { useContext } from "react";
import BuBdSidebar from "./BuBdSidebar";
import BuBdTable from "./BuBdTable";
import Contex from "../store/context";
import MapBuBd from "./MapBUBD";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    //padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  mapWithTableGrid: {
    height: '100vh',
    position: 'relative'
  }
}));

export default function CenteredGrid() {
  const classes = useStyles();

  const { globalState } = useContext(Contex);

  var displayedObject;

  if (globalState.isOpenSidebar) {
    displayedObject = <Grid item xs={3}>
                        <BuBdSidebar />
                      </Grid>;

return (
  <div className={classes.root}>
    <Grid container>
      {displayedObject}
      <Grid item xs>
        <MapBuBd />
      </Grid>
    </Grid>
  </div>
);
  }
  
  
  else if (globalState.isOpenSidebar == false) {
    displayedObject = <Grid item xs={5}>
                        <Paper className={classes.paper}><BuBdTable /></Paper>
                      </Grid>;

return (
  <div className={classes.root}>
    <Grid container>
      {displayedObject}
      <Grid item xs={7} className={classes.mapWithTableGrid}>
        <MapBuBd />
      </Grid>
    </Grid>
  </div>
);
  }

  
}
