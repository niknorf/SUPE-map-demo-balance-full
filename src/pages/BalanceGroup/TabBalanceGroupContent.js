import {
  TableRow,
  TableCell,
  Grid,
  Link as LinkDialog
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import TableTemplate from "components/TableTemplate";
import Contex from "store/context";
import axios from "axios";
import InfoWindow from "components/InfoWindow.js";
import { getSessionCookie } from "components/cookies";
import { Link } from "react-router-dom";
import AddTaskDialog from "pages/Tasks/AddTaskDialog.js";
import EditTaskDialog from "pages/Tasks/EditTaskDialog.js";
import ServicesBG from "pages/BalanceGroup/api/ServicesBG";
import ServicesTasks from "pages/Tasks/api/ServicesTasks";

const useStyles = makeStyles(theme => ({}));

function createData(id, fiasAddress, type, gs_link, fias, task_link) {
  return { id, fiasAddress, type, gs_link, fias, task_link };
}

const BalanceGroupContent = () => {
  const classes = useStyles();
  const userInfo = getSessionCookie();
  const [openNewTaskDialog, setNewDialogOpen] = useState(false);
  const [openEditTaskDialog, setEditDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [taskList, setTaskList] = useState({});
  const [rows, setBgContent] = useState([]);
  const [fiasIds, setFiasIds] = useState([]);
  const [tasksStatusObj, setTaskStatus] = useState([]);
  const { globalState } = useContext(Contex);

  useEffect(() => {
    let tempObj = [];
    let arrayRequests = [];

    if (globalState.balance_index !== "") {
      ServicesBG.getBalanceResultFull(globalState.balance_index)
        .then(result => {
          getStuff(result);
        })
        .catch(error => {});
    }
  }, [globalState.balance_index]);

  useEffect(() => {
    ServicesTasks.getTasksList()
      .then(result => {
        setTaskList(result);

        // handleTaskCount(result);
        // setTaskContent(result);
      })
      .catch(error => {});
  }, [openEditTaskDialog]);

  const getStuff = async result => {
    const responses = [];
    let respose_result;
    for (let i = 0; i < result.length; i++) {
      if (result[i].type === "ConsumerBuilding") {
        respose_result = await axios.get(
          process.env.REACT_APP_API_URL + "/api/UserTasks/TasksForFiasExists/" + result[i].fias
        );
        responses.push({
          fias_id: result[i].fias,
          value: respose_result.data
        });
      }
    }

    // setTaskStatus(responses);
    translateText(result, responses);
  };

  const manageTaskDialog = row => {
    if (row.task_link === "Посмотреть задание") {
      handleEditTaskDialogOpen(row);
    } else if (row.task_link === "Создать задание") {
      handleNewTaskDialogOpen(row);
    }
  };

  const handleNewTaskDialogOpen = row => {
    setNewDialogOpen(true);
    setDialogData(row);
  };
  const handleEditTaskDialogOpen = row => {
    setEditDialogOpen(true);
    let selectedTaskfound = taskList.find(element => element.fiasGUID == row.fias);
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

  const BalanceGroupContentRows = row => {
    return (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row" style={{ width: 200 }}>
          {row.fiasAddress}
        </TableCell>
        <TableCell style={{ width: 100 }} align="left">
          {row.type}
        </TableCell>
        <TableCell style={{ width: 50 }} align="right">
          <Link
            to={{
              pathname: "/guaranteedsuppliers",
              row
            }}
          >
            {row.gs_link}
          </Link>
        </TableCell>
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
            {row.task_link}
          </LinkDialog>
        </TableCell>
      </TableRow>
    );
  };

  const tableColumns = [
    {
      id: "fiasAddress",
      numeric: false,
      disablePadding: false,
      label: "Название"
    },
    {
      id: "type",
      numeric: false,
      disablePadding: false,
      label: "Тип"
    },
    {
      id: "gs_link",
      numeric: false,
      disablePadding: false,
      label: ""
    },
    {
      id: "task_link",
      numeric: false,
      disablePadding: false,
      label: ""
    }
  ];

  const translateText = (original, array) => {
    let translation = [
      { original: "ACLineSegment", rus_translate: "Кабельная линия" },
      { original: "Bay", rus_translate: "Групповое присоединение" },
      { original: "Breaker", rus_translate: "Выключатель" },
      { original: "BusbarSection", rus_translate: "Секция шин" },
      { original: "ConnectivityNode", rus_translate: "Соединительные узлы" },
      { original: "ConsumerBuilding", rus_translate: "Здание" },
      { original: "CurrentTransformer", rus_translate: "Трансформатор тока" },
      { original: "Disconnector", rus_translate: "Разъединитель" },
      { original: "Discrete", rus_translate: "Дискретное измерение" },
      { original: "DiscreteValue", rus_translate: "Дискретное значение" },
      { original: "Fuse", rus_translate: "Предохранитель" },
      { original: "GroundDisconnector", rus_translate: "Разъединитель земли" },
      { original: "Jumper", rus_translate: "Перемычка" },
      { original: "Junction", rus_translate: "Узел" },
      { original: "LoadBreakSwitch", rus_translate: "Переключатель нагрузки" },
      { original: "LVCabinet", rus_translate: "ГРЩ" },
      {
        original: "LVSwitchGear",
        rus_translate: "Кабельный киоск/разъединитель"
      },
      { original: "NonConformLoad", rus_translate: "Несогласованная нагрузка" },
      { original: "OperationalLimitSet", rus_translate: "Набор пределов" },
      {
        original: "PotentialTransformer",
        rus_translate: "PotentialTransformer"
      },
      { original: "PowerTransformer", rus_translate: "Силовой трансформатор" },
      { original: "ProtectionEquipment", rus_translate: "Устройство защиты" },
      {
        original: "SubGeographicalRegion",
        rus_translate: "Географический субрегион"
      },
      { original: "Substation", rus_translate: "Подстанция" },
      { original: "Terminal", rus_translate: "Терминал" },
      {
        original: "VoltageLevel",
        rus_translate: "Распределительное устройство"
      },
      { original: "VoltageLimit", rus_translate: "Предел по напряжению" },
      {
        original: "SeriesCompensator",
        rus_translate: "Последовательный компенсатор"
      }
    ];
    let temp = [];
    let tempFiasIds = [];
    for (let i = 0; i < original.length; i++) {
      let gs_link = "";
      let task_link = "";
      let fias = "";
      //Create a link if type of ibject is "ConsumerBuilding"
      if (original[i].type === "ConsumerBuilding") {
        fias = original[i].fias;

        gs_link = "Посмотреть ГП";

        //Only upe_analyst role can add the task but every role can view task
        let taskStatus = array.find(element => element.fias_id === fias);
        if (taskStatus.value) {
          task_link = "Посмотреть задание";
        } else {
          if (userInfo.user_roles.includes("upe_analyst")) {
            task_link = "Создать задание";
          }
        }

        // console.log(getTaskStatus(fias));
        //Push to array the list of fiasId, to check the status of the task_link
        //Set status of the task false by default
        // tempFiasIds.push(fias);
      }
      if (original[i].type !== "Link") {
        for (let j = 0; j < translation.length; j++) {
          if (original[i].type === translation[j].original) {
            original[i].type = translation[j].rus_translate;
          }
        }
        temp.push(
          createData(
            i,
            original[i].name,
            original[i].type,
            gs_link,
            fias,
            task_link
          )
        );
      }
    }
    // setFiasIds(tempFiasIds);
    setBgContent(temp);
  };

  return rows.length > 0
    ? [
        <TableTemplate
          rows={rows}
          columns={tableColumns}
          rowsSettings={BalanceGroupContentRows}
          rowsPerPage={6}
        />,
        <AddTaskDialog
          isDialogOpen={openNewTaskDialog}
          closeDialog={handleNewTaskDialogClose}
          dialogData={dialogData}
        />,
        <EditTaskDialog
          isDialogOpen={openEditTaskDialog}
          closeDialog={handleEditTaskDialogClose}
          dialogData={dialogData}
        />
      ]
    : [
        <InfoWindow
          label="Проверить топологию сети - привязку ПУ"
          icon="info"
        />
      ];
};

export { BalanceGroupContent };
