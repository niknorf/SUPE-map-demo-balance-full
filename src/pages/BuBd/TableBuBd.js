import {
  TableCell,
  TableRow,
  Typography,
  Container,
  Icon,
  Link as LinkDialog
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import LoadingOverlay from "react-loading-overlay";
import TableTemplate from "components/TableTemplate";
import InfoWindow from "components/InfoWindow.js";
import React, { useContext, useEffect, useState } from "react";
import Contex from "store/context";
import axios from "axios";
import AddTaskDialog from "pages/Tasks/AddTaskDialog.js";
import EditTaskDialog from "pages/Tasks/EditTaskDialog.js";
import ServicesBuBd from "pages/BuBd/api/ServicesBuBd";
import ServicesTasks from "pages/Tasks/api/ServicesTasks";
import grey_marker from "pages/BuBd/img/grey.png";
import orange_marker from "pages/BuBd/img/orange.png";
import red_marker from "pages/BuBd/img/red.png";
import yellow_marker from "pages/BuBd/img/yellow.png";

const TableBuBd = () => {
  const [rows, setBuBdData] = useState([]);
  const [openNewTaskDialog, setNewDialogOpen] = useState(false);
  const [taskList, setTaskList] = useState({});
  const [openEditTaskDialog, setEditDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { globalDispach } = useContext(Contex);
//array of table columns
  const tableColumns = [
    {
      id: "address",
      numeric: false,
      disablePadding: false,
      label: "Адрес"
    },
    {
      id: "percent_probability_BU",
      numeric: true,
      disablePadding: true,
      label: "Вероятность"
    },
    {
      id: "probability_type",
      numeric: false,
      disablePadding: false,
      label: "Тип вероятности"
    },
    // {
    //   id: "report",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "Акт"
    // },
    {
      id: "task_status",
      numeric: false,
      disablePadding: false,
      label: "Статус задания"
    }
  ];

  const rowsPerPage = 11;

  useEffect(() => {
    setLoading(true);
    ServicesBuBd.getBuBd()
      .then(result => {
        getStuff(result);
      })
      .catch(error => {});
  }, []);

  useEffect(() => {
    ServicesTasks.getTasksList()
      .then(result => {
        setTaskList(result);
      })
      .catch(error => {});
  }, [openEditTaskDialog]);

  const getStuff = async result => {
    const responses = [];
    let respose_result;

    for (let i = 0; i < result.length; i++) {
      respose_result = await axios.get(
        "/api/UserTasks/TasksForFiasExists/" + result[i].fias_id
      );
      responses.push({
        fias_id: result[i].fias_id,
        value: respose_result.data
      });
    }
    manageBuBdData(result, responses);
    setLoading(true);
  };

  const manageBuBdData = (original, array) => {
    let temp = [];
    let tempFiasIds = [];

    for (let i = 0; i < original.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (original[i].fias_id === array[j].fias_id) {
          if (array[j].value) {
            original[i].task_status = "Посмотреть задание";
          } else {
            original[i].task_status = "Создать задание";
          }
        }
      }
    }
    setBuBdData(original);
  };

  const manageTaskDialog = row => {
    if (row.task_status === "Посмотреть задание") {
      handleEditTaskDialogOpen(row);
    } else if (row.task_status === "Создать задание") {
      handleNewTaskDialogOpen(row);
    }
  };

  const handleNewTaskDialogOpen = row => {
    setNewDialogOpen(true);
    setDialogData(row);
  };
  const handleEditTaskDialogOpen = row => {
    setEditDialogOpen(true);
    let selectedTaskfound = taskList.find(
      element => element.fiasGUID == row.fias_id
    );
    setDialogData(selectedTaskfound);
  };

  const handleNewTaskDialogClose = () => {
    setNewDialogOpen(false);
    setDialogData({});
  };
  const handleEditTaskDialogClose = () => {
    setEditDialogOpen(false);
    setDialogData({});
  };

  const defaultProps = {
    bgcolor: "rgba(140, 148, 158, 0.1)",
    style: {
      width: "6.9rem",
      height: "1.5rem",
      color: "rgba(140, 148, 158, 1)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  };

  const tableRowClick = (event, row) => {
    row.tp = "данные подгружаются";
    globalDispach({
      isOpenSidebar: true,
      markerValue: row
    });
  };

  const BuBdTableRows = (row, print) => {
    return (
      <TableRow
        hover
        tabIndex={-1}
        key={row.fias_id}
        classes={{ hover: classes.rowHover }}
        // Set to undefined if the table goes to print, because otherwise it will print in one line
        // component={print === "print" ? undefined : Link}
        // to="/bubd"
      >
        <TableCell
          component="th"
          scope="row"
          onClick={event => tableRowClick(event, row)}
          padding="default"
          align="left"
        >
          {row.address}
        </TableCell>
        <TableCell
          align="left"
          onClick={event => tableRowClick(event, row)}
        >
          {CreateIcon(
            classes,
            row.probability_BU === 1
              ? row.percent_probability_BU
              : row.percent_probability_BD
          )}
        </TableCell>
        <TableCell
          align="left"
          onClick={event => tableRowClick(event, row)}
        >
          Безучетное потребление
        </TableCell>
        {/* <TableCell align="center">
          <Link underline="always" className={classes.linkStyle}>
            Добавить обратную связь
          </Link>
        </TableCell> */}
        <TableCell style={{ width: 50 }} align="right">
          <LinkDialog
            component="button"
            variant="body2"
            underline="always"
            color="primary"
            onClick={() => {
              manageTaskDialog(row);
            }}
          >
            {row.task_status}
          </LinkDialog>
        </TableCell>
      </TableRow>
    );
  };

  return rows.length > 0
    ? [

          <TableTemplate
            key='tablebubd-tabletemplate-component'
            rows={rows}
            columns={tableColumns}
            rowsSettings={BuBdTableRows}
            rowsPerPage={rowsPerPage}
            orderBy="percent_probability_BU"
            order="desc"
          />,
        <AddTaskDialog
          key='tablebubd-addtaskdialog-component'
          isDialogOpen={openNewTaskDialog}
          closeDialog={handleNewTaskDialogClose}
          dialogData={dialogData}
        />,
        <EditTaskDialog
          key='tablebubd-edittaskdialog-component'
          isDialogOpen={openEditTaskDialog}
          closeDialog={handleEditTaskDialogClose}
          dialogData={dialogData}
        />
      ]
    : [
        <LoadingOverlay
          key='tablebubd-loadingoverlay-component'
          active={loading}
          spinner={<CircularProgress style={{ color: "#252F4A" }} key='tablebubd-circularprogress-component' />}
          text=""
          styles={{
            overlay: base => ({
              ...base,
              background: "rgba(34, 47, 74, 0.3)"
            })
          }}
        >
          <InfoWindow label="Нет данных" icon="info" key='tablebubd-infowindow-component'/>
        </LoadingOverlay>
    ];
};

//Function dynamically creates icon with color based on the percent
const CreateIcon = (classes, number) => {
  let color = grey_marker;

  if (parseInt(number) > 75) {
    color = red_marker;
  } else if (parseInt(number) > 50) {
    color = orange_marker;
  } else if (parseInt(number) > 25) {
    color = yellow_marker;
  } else {
    color = grey_marker;
  }

  return (
    <Container className={classes.iconContainer} key='tablebubd-createicon-container'>
      <Icon className={classes.tableIcon}  key='tablebubd-createicon-icon'>
        <img className={classes.markerIcon} src={color} alt="" />
      </Icon>
      <Typography  key='tablebubd-createicon-typography'>{number + "%"}</Typography>
    </Container>
  );
};


const useStyles = makeStyles(theme => ({
  markerIcon: {
    width: 25,
    height: 25
  },
  iconContainer: {
    display: "flex",
    alignItems: "center"
  },
  linkStyle: {
    color: "#4A9CFF",
    whiteSpace: "nowrap"
  },
  tableIcon: {
    paddingRight: "56px"
  },
  rowHover: {
    "&:hover": {
      cursor: "pointer"
    },
    textDecoration: "none"
  }
}));

export { TableBuBd };
