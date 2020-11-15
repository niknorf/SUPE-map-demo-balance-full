import { Typography, TableRow, TableCell, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import TableTemplate from "./TableTemplate";
import Contex from "../store/context";
import InfoWindow from "./InfoWindow.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));

function createData(id, name, type, link, fias) {
  return { id, name, type, link, fias };
}

const BalanceGroupContent = () => {
  const classes = useStyles();
  const [rows, setBgContent] = useState([]);
  const { globalState } = useContext(Contex);

  useEffect(() => {
    if (globalState.balance_index !== "") {
      fetch("/api/Results/GetBalanceResultFull/" + globalState.balance_index)
        .then((res) => res.json())
        .then(
          (result) => {
            translateText(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            // setLoading(true);
            // setError(error);
          }
        );
    }
    // setLoading(true);
  }, [globalState.balance_index]);

  const BalanceGroupContentRows = (row) => {
    return (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row" style={{ width: 200 }}>
          {row.name}
        </TableCell>
        <TableCell style={{ width: 100 }} align="left">
          {row.type}
        </TableCell>
        <TableCell style={{ width: 50 }} align="right">
          {/* href="guaranteedsuppliers" numeric component="a" */}
          <Link
            to={{
              pathname: "/guaranteedsuppliers",
              row,
            }}
            // component="button"
            // variant="body2"
            // underline="always"
            // color="primary"
            // onClick=
            // {() => {
            //   console.log(row);
            //   /*redirect to faranteenned syppliers*/
            // }}
            >{row.link}
          </Link>
        </TableCell>
      </TableRow>
    );
  };

  const tableColumns = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Название",
    },
    {
      id: "type",
      numeric: false,
      disablePadding: false,
      label: "Тип",
    },
    {
      id: "link",
      numeric: false,
      disablePadding: false,
      label: "",
    },
  ];

  const translateText = (original) => {
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
        rus_translate: "Кабельный киоск/разъединитель",
      },
      { original: "NonConformLoad", rus_translate: "Несогласованная нагрузка" },
      { original: "OperationalLimitSet", rus_translate: "Набор пределов" },
      {
        original: "PotentialTransformer",
        rus_translate: "PotentialTransformer",
      },
      { original: "PowerTransformer", rus_translate: "Силовой трансформатор" },
      { original: "ProtectionEquipment", rus_translate: "Устройство защиты" },
      {
        original: "SubGeographicalRegion",
        rus_translate: "Географический субрегион",
      },
      { original: "Substation", rus_translate: "Подстанция" },
      { original: "Terminal", rus_translate: "Терминал" },
      {
        original: "VoltageLevel",
        rus_translate: "Распределительное устройство",
      },
      { original: "VoltageLimit", rus_translate: "Предел по напряжению" },
      {
        original: "SeriesCompensator",
        rus_translate: "Последовательный компенсатор",
      },
    ];
    let temp = [];

    for (let i = 0; i < original.length; i++) {
      let gs_link = "";
      let fias = "";
      if (original[i].type === "ConsumerBuilding") {
        gs_link = "Посмотреть ГП";
        fias = original[i].fias;
      }
      if (original[i].type !== "Link") {
        for (let j = 0; j < translation.length; j++) {
          if (original[i].type === translation[j].original) {
            original[i].type = translation[j].rus_translate;
          }
        }
        temp.push(
          createData(i, original[i].name, original[i].type, gs_link, fias)
        );
      }
    }

    setBgContent(temp);
  };

  return rows.length > 0
    ? [
        <TableTemplate
          rows={rows}
          columns={tableColumns}
          rowsSettings={BalanceGroupContentRows}
        />,
      ]
    : [
        <InfoWindow
          label="Проверить топологию сети - привязку ПУ"
          icon="info"
        />,
      ];
};

export { BalanceGroupContent };
