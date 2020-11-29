import "../css/mapBuBd.css";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button, Typography, Icon } from "@material-ui/core";
import React, { useContext } from "react";
import BuBdSidebar from "./BuBdSidebar";
import BuBdTable from "./BuBdTable";
import Contex from "../store/context";
import MapBuBd from "./MapBUBD";
import Popover from '@material-ui/core/Popover';
import cluster_marker from '../img/cluster.png';
import grey_marker from "../img/grey.png";
import yellow_marker from "../img/yellow.png";
import orange_marker from "../img/orange.png";
import red_marker from "../img/red.png";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
  paper: {
    //padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  mapWithTableGrid: {
    height: '100vh',
    position: 'relative'
  },
  info: {
    position: 'absolute',
    left: '47%',
    top: '12px',
    textTransform: 'none',
    zIndex: 99,
    color: '#4A9CFF',
    boxShadow: '4px 6px 18px rgba(0, 0, 0, 0.06)',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  popover: {
    margin: '16px'
  },
  clusterWrapper: {
    display: 'flex',
    width: '30px',
    height: '30px',
    marginRight: '14px'
  },
  clusterMarkerIcon: {
    width: '30px'
  },
  markerWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '18px'
  },
  markerIcon: {
    width: '18px'
  },
  description: {
    padding: '0 !important;'
  }
}));

export default function CenteredGrid() {
  const classes = useStyles();

  const { globalState } = useContext(Contex);

  var displayedObject;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (globalState.isOpenSidebar) {
    displayedObject = <Grid item xs={3}>
      <BuBdSidebar />
    </Grid>;

    return (
      <div className={classes.root}>
      <Button className={classes.info} startIcon={<ErrorOutlineIcon />} aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
          Обозначения
      </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Typography className={classes.popover}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Icon className={classes.clusterWrapper}>
                      <img src={cluster_marker} className={classes.clusterMarkerIcon}></img>
                    </Icon>
                  </td>
                  <td className={classes.description}>
                    Кластер, группирующий обьекты
                  </td>
                </tr>
                <tr>
                  <td>
                    <Icon className={classes.markerWrapper}>
                      <img src={grey_marker} className={classes.markerIcon}></img>
                    </Icon>
                  </td>
                  <td className={classes.description}>
                    Данных не хватает для определения БУ и БД
                  </td>
                </tr>
                <tr>
                  <td>
                    <Icon className={classes.markerWrapper}>
                      <img src={yellow_marker} className={classes.markerIcon}></img>
                    </Icon>
                  </td>
                  <td className={classes.description}>
                    Вероятность БУ и БД до 30%
                  </td>
                </tr>
                <tr>
                  <td>
                    <Icon className={classes.markerWrapper}>
                      <img src={orange_marker} className={classes.markerIcon}></img>
                    </Icon>
                  </td>
                  <td className={classes.description}>
                    Вероятность БУ и БД от 30% до 65%
                  </td>
                </tr>
                <tr>
                  <td>
                    <Icon className={classes.markerWrapper}>
                      <img src={red_marker} className={classes.markerIcon}></img>
                    </Icon>
                  </td>
                  <td className={classes.description}>
                    Вероятность БУ и БД от 65% до 100%
                  </td>
                </tr>
              </tbody>
            </table>
          </Typography>
        </Popover>
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
      <Paper className={classes.paper}><BuBdTable rowsPerPage={10} topFive={false}/></Paper>
    </Grid>;

    return (
      <div className={classes.root}>
        <Button className={classes.info} startIcon={<ErrorOutlineIcon />} aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
          Обозначения
      </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Typography className={classes.popover}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Icon className={classes.clusterWrapper}>
                      <img src={cluster_marker} className={classes.clusterMarkerIcon}></img>
                    </Icon>
                  </td>
                  <td className={classes.description}>
                    Кластер, группирующий обьекты
                  </td>
                </tr>
                <tr>
                  <td>
                    <Icon className={classes.markerWrapper}>
                      <img src={grey_marker} className={classes.markerIcon}></img>
                    </Icon>
                  </td>
                  <td className={classes.description}>
                    Данных не хватает для определения БУ и БД
                  </td>
                </tr>
                <tr>
                  <td>
                    <Icon className={classes.markerWrapper}>
                      <img src={yellow_marker} className={classes.markerIcon}></img>
                    </Icon>
                  </td>
                  <td className={classes.description}>
                    Вероятность БУ и БД до 30%
                  </td>
                </tr>
                <tr>
                  <td>
                    <Icon className={classes.markerWrapper}>
                      <img src={orange_marker} className={classes.markerIcon}></img>
                    </Icon>
                  </td>
                  <td className={classes.description}>
                    Вероятность БУ и БД от 30% до 65%
                  </td>
                </tr>
                <tr>
                  <td>
                    <Icon className={classes.markerWrapper}>
                      <img src={red_marker} className={classes.markerIcon}></img>
                    </Icon>
                  </td>
                  <td className={classes.description}>
                    Вероятность БУ и БД от 65% до 100%
                  </td>
                </tr>
              </tbody>
            </table>
          </Typography>
        </Popover>
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
